// requires marked.min.js, tocbot.min.js, js-yaml.min.js, vue.min.js
var ISA_DEBUG = 0;

function extract_front_matter(data) {
  data = data.trim();
  var lines = data.split("\n");

  var frontmatter = {};

  // check if front matter exists
  if (lines[0].trim().includes("---")) {
    var nlines = lines.length;
    lines = lines.splice(1, nlines);
    var trimmedlines = lines.map((l) => l.trim());

    var end = trimmedlines.indexOf("---");

    var frontmatter_text = lines.splice(0, end).join("");
    if (ISA_DEBUG) console.log("FRONT MATTER TEXT ->\n" + frontmatter_text);

    if (frontmatter_text) {
      var __frontmatter = window.jsyaml.load(frontmatter_text);
      if (__frontmatter) frontmatter = __frontmatter;
    }

    data = lines.splice(end + 1, nlines - 1).join("\n");
  }

  if (ISA_DEBUG) console.log("FRONT MATTER ->\n" + JSON.stringify(frontmatter));

  return [frontmatter, data];
}

// https://alvinabad.wordpress.com/2008/06/01/dynamically-including-javascript-and-css-files/
function includeCSSfile(href) {
  var head_node = document.getElementsByTagName("head")[0];
  var link_tag = document.createElement("link");
  link_tag.setAttribute("rel", "stylesheet");
  link_tag.setAttribute("type", "text/css");
  link_tag.setAttribute("href", href);
  head_node.appendChild(link_tag);
}

function renderVue(__frontmatter) {
  var __fm = __frontmatter;

  var Vue = window.Vue;

  var v_themeloader = new Vue({
    el: "#themeloader",
    data: {
      current_theme: __fm.themes[0], // load the first theme
    },
  });

  window.v_themeloader = v_themeloader;

  var v_themebox = new Vue({
    el: ".themebox",
    data: {
      themes_available: __fm.themes,
    },
    methods: {
      loadtheme: function (event) {
        var selected_theme = event.target.value;
        if (ISA_DEBUG) console.log("Selected new theme -> " + selected_theme);
        window.v_themeloader.current_theme = selected_theme;
      },
    },
  });

  window.v_themebox = v_themebox;
}



function ENTRY(){


//check if MD-RENDERER Library is loaded
MD_RENDERER_LOADED= false;
MATH_RENDERER_LOADED= false;
if (window.commonmark) {MD_RENDERER_LOADED='CommonMark'}//pass
if (window.MathJax.typeset) {MATH_RENDERER_LOADED='MathJax'} //MathJax maybe loade but MathJax.typeset might not be ready 

if(MD_RENDERER_LOADED && MATH_RENDERER_LOADED){
  console.log(`===> Rendering using ${MD_RENDERER_LOADED} and ${MATH_RENDERER_LOADED}`);
}
else {setTimeout(ENTRY,50);return;} //call yourself again and return immediately

// LOAD Markdown
fetch("index.md")
  .then((md) => md.text())
  .then((md) => {
    var element = document.querySelector(".stackedit__html");

    var extracted = extract_front_matter(md);

    // frontmatter stuff
    var fm = extracted[0];

    // Dynamically load theme
    if ("themes" in fm) {
      // themename = fm["themes"]
      // includeCSSfile("/__resources/sampy/themes/"+ themename +".css")
    } else {
      //Inject themes = ["default"]
      fm.themes = ["default"];
    }

    // render the stuff using VueJS
    renderVue(fm);

    // Actual Markdown Content (no frontmatter)
    var onlymd = extracted[1];

    // render using markedjs
    // element.innerHTML = marked(onlymd)

    // render using texme + external renderer = markedjs
    element.innerHTML = window.texme.render(onlymd);

    // MAKE Table of Content
    window.tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".stackedit__toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".stackedit__html",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      orderedList: false,
    });

    // MathJax was never called by texme as we prevented running of texme.renderPage using the option -> renderOnLoad: false
    // Manually run the MathJax Typeset function -> see texme.renderPage to get the idea how it is run
    
    window.MathJax.typeset()
    //renderMathJax = ()=>{MathJax.Hub.Queue(["Typeset", MathJax.Hub, element])}
    //renderKatex = ()=>{renderMathInElement(document.body)}
    //renderMathJax()
    //window.onload = renderMathJax //load when page is ready, recall texme loads MathJax, hence MathJax needs to be loaded when we call renderMathJax
    //window.onload = renderKatex
  });
}

ENTRY()
// setInterval(()=>{window.location.reload()},5000)
