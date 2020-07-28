//requires marked.min.js, tocbot.min.js, js-yaml.min.js, vue.min.js


ISA_DEBUG=0


function extract_front_matter(data){
    data = data.trim()
    lines = data.split("\n")
 
    frontmatter={};

    //check if front matter exists
    if(lines[0].trim().includes("---"))
    {
      nlines = lines.length;
      lines = lines.splice(1,nlines)
      trimmedlines = lines.map(l => l.trim())

      end = trimmedlines.indexOf("---")

      frontmatter_text = lines.splice(0,end).join("")
      if(ISA_DEBUG)console.log("FRONT MATTER TEXT ->\n" + frontmatter_text);

      if(frontmatter_text) {
          __frontmatter = jsyaml.load(frontmatter_text)
          if(__frontmatter) frontmatter = __frontmatter;
      }

      data =   lines.splice(end+1,nlines-1).join("\n")
    }

    if(ISA_DEBUG) console.log("FRONT MATTER ->\n" + JSON.stringify(frontmatter));

    return [frontmatter,data]
   
  }


    //https://alvinabad.wordpress.com/2008/06/01/dynamically-including-javascript-and-css-files/
    function includeCSSfile(href) {
        var head_node = document.getElementsByTagName('head')[0];
        var link_tag = document.createElement('link');
        link_tag.setAttribute('rel', 'stylesheet');
        link_tag.setAttribute('type', 'text/css');
        link_tag.setAttribute('href', href);
        head_node.appendChild(link_tag);
    }   



    

    function renderVue(__frontmatter)
    {
      __fm = __frontmatter;


      var v_themeloader = new Vue({
        el: '#themeloader',
        data: {
          current_theme: "", //load the first theme
        },
       
      })

      window.v_themeloader = v_themeloader

      var v_themebox = new Vue({
        el: '.themebox',
        data: {
          themes_available: __fm["themes"],
        },
        methods: {
          loadtheme: function (event) {
            selected_theme = event.target.value
            if(ISA_DEBUG) console.log("Selected new theme -> "+ selected_theme)
            v_themeloader.current_theme = selected_theme
          }
        }
      })

      window.v_themebox = v_themebox  
      


      



    }



  

  //LOAD Markdown
  fetch("index.md").then(md=>md.text()).then(md=>{
      element = document.querySelector(".stackedit__html");


      extracted = extract_front_matter(md)
      
      //frontmatter stuff
      fm = extracted[0]


      //Dynamically load theme
      if ("themes" in fm){
          //themename = fm["themes"]
          //includeCSSfile("/__resources/sampy/themes/"+ themename +".css")
      }
      else
      {
        fm["theme"] = ["default"]
      }

      //render the stuff using VueJS
      renderVue(fm)
  

      onlymd = extracted[1]

      element.innerHTML = marked(onlymd)

       // MAKE Table of Content
          tocbot.init({
          // Where to render the table of contents.
          tocSelector: '.stackedit__toc',
          // Where to grab the headings to build the table of contents.
          contentSelector: '.stackedit__html',
          // Which headings to grab inside of the contentSelector element.
          headingSelector: 'h1, h2, h3',
          // For headings inside relative or absolute positioned containers within content.
          hasInnerContainers: true,
          orderedList: false,
          });
  })




  //setInterval(()=>{window.location.reload()},5000)


