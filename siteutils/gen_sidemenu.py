import os
import glob
import yaml

def getdirs(path):
    dirs = glob.glob(f"{path}/*")
    dirs = list(filter(os.path.isdir, dirs))
    return dirs


def getfrontmatter(filename):
    fmyml = ""
    
    with open(filename) as f:
        firstline = f.readline()
        
        if "---" in firstline:
            while "---" not in (line:=f.readline()):
                fmyml += line
            fm = yaml.safe_load(fmyml)
            return fm   
        else:
            return None


############ HIGHLEVEL FUNCTIONS ###############

def fillconfs(dirname, conffile):
    print("=====")

    
    pages = getdirs(dirname)

    print(f"Found {len(pages)} pages ...\n")


    allcats = {}
    
    for p in pages:
        pagename = p.split("/")[-1]    
        print(f"-> {pagename}")
        
        fm = getfrontmatter(f"{p}/index.md")
        
        
        if 'category' in fm: category = fm["category"]
        else: category = "general"
        category = category.upper()

        if category in allcats:
            allcats[category] += [pagename]
        else:
            allcats[category] = [pagename]

    if not os.path.isfile(conffile): 
        print(f'not found -> {conffile}')
        return 
        
    with open(conffile,'w') as g:
        confyml = yaml.dump(allcats)
        g.write(confyml)

    print("=====")

if __name__ == "__main__":

    fillconfs("../notes","../__landing/sidemenu/configs/notes.yml")
    fillconfs("../blog","../__landing/sidemenu/configs/blog.yml")

        

        

