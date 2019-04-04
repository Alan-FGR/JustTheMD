# JustTheMD - Efortlessly present your Markdown files in GitHub style without the clutter

[Demo of this page here.](https://alan-fgr.github.io/JustTheMD/)

## The Goal

You want to show the world some markdown files from your GitHub repository, but you don't want to link the repository itself because of the 'noise' and irrelevant data that's displayed by GitHub like the menus and files/directories. You also don't want extra maintenance in order to have that, and preferably no extra files polluting your repository.

## The Problem

GitHub has automated Jekyll pages, but they aren't a good solution if you just want to display your markdowns in a cleaner way. Not only the style is very different from the GitHub style, but anchors/permalinks don't work, and although you can choose from many themes these days (using the `remote_theme: user/repo`), most simply don't work properly with the automated GitHub pages because they need configuration, and they pollute your repository with configuration files (`_config.yml`) and the problems mentioned previously still apply anyway.

## The Solution

Enter **JustTheMD**: a fully automated page that will parse and display your markdown files in your GH Pages domain. This very page you're reading is automatically parsed simply by the fact that the `index.html` file exists in this repository. The resulting web page can be read [here](https://alan-fgr.github.io/JustTheMD/).
After installing JustTheMD in your repository, that page is generated from the markdown in it, and it's all dynamic and automatic, so that's a legit 100% zero-effort solution if you just want to have a README.md link that displays exactly as shown in GitHub without the extra clutter.

What's even better is that installing JustTheMD consists of adding a single html file to your repository, and even better, it doesn't have to be on your master branch! You can simply create a branch named `gh-pages`, add the html file there, and never care about it again. Refer to the Getting Started section for more information.

## Advanced Features

Sometimes you need to display more than just the README.md... or maybe you don't want to display it at all and want some different markdown file for your landing page. JustTheMD allows you to configure that. By simply declaring some variables in the JustTheMD html file in your repository you can configure the footer of the generated pages, and also the pages to be used in the top navigation bar. You can have as many pages as you want, both local and remote (useful if you want to link markdowns of your dependencies). URLs for configured pages are prettified so you can have short and shareable links. Also, as opposed to other solutions there are contextual anchor links and they work just as in GitHub, so sharing links to the relevant content is literally one click away!

# Setting up

## How JustTheMD Works?

JustTheMD is basically a browser application that you install/copy to any GitHub repository. You can optionally use the gh-pages branch which is specially handled by GitHub so there's no change in your main/master repository. Whenever your GH Pages URL is accessed, the index.html file that calls JustTheMD is loaded and executed in the browser. The only requirement for JustTheMD to work is having the correct files at the branch being used as source for GH Pages (gh-pages by default).

## Getting Started

If you don't already have a gh-pages branch, the setup is very simple, you can have JustTheMD working for your repository simply by opening a command line in the directory of the repository where you want to install JustTheMD and running these commands (on Windows run from the git bash):
``` sh
git checkout --orphan gh-pages
git rm -rf .
curl https://alan-fgr.github.io/JustTheMD/index.html > index.html
git add .
git commit -m "added JustTheMD"
git push --set-upstream origin gh-pages
``` 
or you can even run all of that in one-shot:
```
git checkout --orphan gh-pages && git rm -rf . && curl https://alan-fgr.github.io/JustTheMD/index.html > index.html && git add . && git commit -m "added JustTheMD" && git push --set-upstream origin gh-pages
```
and that's it! You can now access the URL of the GH Pages (https://YOURUSERNAME.github.io/REPOSITORY/) and the README.md will be presented there in gloriously consistent markdown, exactly as it's displayed in your repository but without all the clutter.   

After running those commands don't forge to switch back to your previous branch when you're done:
```
git checkout master
```
if you were on the master branch.

## Advanced Configuration

If you want to display more or different files, or want a custom footer, that is also very easy to do, you simply have to configure some variables in your index.html file. There is an index file with sample configuration that you can use as a starting point, if you don't have a gh-pages branch yet, the steps are the same as above, except that on line 3 you'll download a different file:
```
curl https://alan-fgr.github.io/JustTheMD/index_custom_pages.html > index.html
```
in the index.html file downloaded by that command and you'll find the following code:
```JS
// CONFIGURE YOUR PAGES AND FOOTER HERE (if no page is configured, the README.md is used)
var JustTheMD_Pages = {
    "My Project": "README.md", // default / landing
    "Some Local Page": "Pages/Local.md",
    "Some External Page": "https://github.com/zeux/meshoptimizer/blob/master/README.md"
}
var JustTheMD_Footer = "Custom Footer Text"
```
the code should be somewhat self-explanatory. JustTheMD_Pages is a dictionary of pages, the keys are the page names (which are slugified for pretty links) and the values are the URLs of the page. The first entry is the default page, which is loaded without page specified in the URL. The footer can contain html links and text tags (e.g. `<a href="SOMEURL">link text</a>`). The first page links will always be `repo/#anchor` while the other pages will have a page id in the URL `repo/?page2#anchor`.

The markdown file can be any URL, it can be from an external repository for example, so you can use this for documentation and add documentation of dependencies, which will display directly in your JustTheMD page in a link on the header. Permalinks will still work for all pages.

## Custom Themes

If you would like to fully customize the JustTheMD theme, that is actually not only possible but quite easy. Read the instructions above, but download the `index_default_theme.html` instead. On line 3 of commands on Getting Started:
```
curl https://alan-fgr.github.io/JustTheMD/index_default_theme.html > index.html
```
you don't need to download any other file. JustTheMD will detect that you have a custom theme and will instead populate it with the data instead of generating the entire page body for you.
That same file is used for generating the default theme as well, and it contains HTML comments to help you figure what you can safely modify. The `page_style.css` is not necessary and the few required includes or identifiers are marked with a `<!--REQUIRED-->` comment.

## Installing in the master branch

If you'll be changing the JustTheMD configuration often, it might be desirable to install it in the master branch so you don't have to switch branch to update them. To do that simply copy the `index.html` file of your preference to the root of your branch, and on GitHub go to your repository page, then open the "Settings" tab on the top of the page, and select "master" as the source branch in the "GitHub Pages" section. That way GH Pages will load the index.html from your master branch.

## Manual Installation

If for some reason you want to install JustTheMD manually, you can always download the latest version in a zip archive from here:

[**Latest JustTheMD Version Download Link**](https://codeload.github.com/Alan-FGR/JustTheMD/zip/master)

To install JustTheMD simply extract that to the root of the gh-pages (or master) branch, then push to GitHub and you're done.

# Sample Repositories

There are a couple of sample repositories in case you want to check how to configure JustTheMD or if you would like to see some more demonstrations:

**NOTE: Please note that the sample content Table of Contents is broken but that's because the sources are incorrect, I couldn't find better working code and *ain't nobody got time* to fix that. JustTheMD works perfectly fine with custom TOC permalinks.**

## No configuration just the README.md

This is a repository in which JustTheMD was installed in the gh-pages branch. It uses the default index.html file, so no configurations were changed. JustTheMD will load the README.md file.

[Link to the Repository](https://github.com/Alan-FGR/JustTheMD-Sample)
[Link to the JustTheMD Page](https://alan-fgr.github.io/JustTheMD-Sample/)

## Advanced configuration with custom footer and external Markdown file

This is a repository with custom JustTheMD configuration in which JustTheMD was installed in the master branch. Open the index.html in the repository link to see the configurations.

[Link to the Repository](https://github.com/Alan-FGR/JustTheMD-Sample-Advanced)
[Link to the JustTheMD Page](https://alan-fgr.github.io/JustTheMD-Sample-Advanced/)

# Showcase

- [ælum engine](https://github.com/Alan-FGR/aelum) - [JustTheMD](https://alan-fgr.github.io/aelum/)

More coming soon...

# Support

## Browser Compatibility

JustTheMD will run fine in any reasonaly standards compliant and updated browser.

## Issues and Contributions

Please feel free to open issues and submit PRs or contribute in any other form. Stars are very appreciated.

# Donate

Let's face it: you're not going to :trollface:. "Donate" stars if you will ;).