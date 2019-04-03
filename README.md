# JustTheMD - Efortlessly present your Markdown files in GitHub style without the clutter

[Demo of this page here.](https://alan-fgr.github.io/JustTheMD/)

## The Goal

You want to show the world some markdown files from your GitHub repository, but you don't want to link the repository itself because of the 'noise' that's displayed like GitHub menus and files/directories. You also don't want extra maintenance like generating files.

## The Problem

GitHub has automated Jekyll pages, but they aren't a good solution. Not only the style is very different from the GitHub style, but anchors/permalinks don't work, and although you can choose from many themes these days (using the `remote_theme: user/repo`), most simply don't work properly with the automated GitHub pages because they need configuration, and the problems mentioned previously still apply anyway.

## The Solution

This repository has a branch named `gh-pages`, that branch contains a fully automated page that will parse and display your markdown files in the URL simply by placing the files there. This very page you're reading will be automatically parsed by that page, and can be read [here](https://alan-fgr.github.io/JustTheMD/). After setting up your gh-pages branch, that page is generated from the markdown in your repository, so that's a legit 100% zero-effort solution if you just want to have a README.md link that displays exactly as shown in GitHub without the extra clutter.

## Advanced Usage

Sometimes you need to display more than just the README.md... or maybe you don't want to display it and want some different markdown for your landing page. JustTheMD has some simple configurations for that. By simply adding a file named `markdown-pages.txt` to your repository you can configure the footer of the generated pages, and also the pages to be generated. You can have as many as you want, bot local and remote (useful if you want to link markdowns of your dependencies). Links and permalinks work for all cases, and there's support for markdown Table of Contents permalinks.

# Setting up

## How JustTheMD Works?

JustTheMD is basically a browser application, that you install/copy to the gh-pages branch of any GitHub repository. That branch is specially handled by GitHub so whenever the URL of your repository "GH Pages" is accessed, the index.html file that calls JustTheMD is loaded and executed in the browser. The only requirement for JustTheMD to work is having the correct files at that branch.

## Getting Started

If you don't already have a gh-pages branch, the setup is very simple, you can have JustTheMD working for your repository simply by opening a command line in the directory of the repository where you want to install JustTheMD and running these commands:
``` sh
git checkout --orphan gh-pages
rm -rf *
git clone -b gh-pages --depth=1 https://github.com/Alan-FGR/JustTheMD
rm -rf JustTheMD/.git
mv JustTheMD/* .
git add .
git commit -m "added JustTheMD"
git push --set-upstream origin gh-pages
```
or you can even run all of that in one-shot:
```
git checkout --orphan gh-pages && rm -rf * && git clone -b gh-pages --depth=1 https://github.com/Alan-FGR/JustTheMD && rm -rf JustTheMD/.git && mv JustTheMD/* . && git add . && git commit -m "added JustTheMD" && git push --set-upstream origin gh-pages
```
and that's it! You can now access the URL of the GH Pages (https://YOURUSERNAME.github.io/REPOSITORY/) and the README.md will be presented there in gloriously consistent markdown, exactly as it's displayed in your repository but without all the clutter.

## Manual Installation

If for some reason you want to install JustTheMD manually, you can always download the latest version in a zip archive from here:

[**Latest JustTheMD Version Download Link**](https://codeload.github.com/Alan-FGR/JustTheMD/zip/gh-pages)

To install JustTheMD simply extract that to the root of the gh-pages branch, then push to GitHub and you're done.

## Advanced Configuration

If you want to display more or different files, or want a custom footer, that is also very easy to do, you simply have to create a `markdown-pages.txt` in the root of your `master` branch, and configure it correctly:

- The first line is the footer note (it's html so can contain links)
- The subsequent lines are the pages formatted like this `Page Name = MarkdownFile.md`
- The first page configured is the default page and will **not** have a page id in the URL, so the main page links aren't polluted with unecessary page tags, the first page links will always be `repo/#anchor` while the other pages will have a page id in the URL `repo/?page2#anchor`.

The markdown file can be any URL, it can be from an external repository for example, so you can use this for documentation and add documentation of dependencies, which will display directly in your JustTheMD page in a link on the header. Permalinks will still work for all pages.

There's also a handy command to create a sample configuration in your repo:

```
printf "Footer Note\r\nFirst Page = FirstPage.md\r\nSecond Page = SecondPage.md" > markdown-pages.txt
```
simply use the file created in the repo as a template and you should be good to go.

# Sample Repositories

There are a couple of sample repositories in case you want to check how to configure JustTheMD or if you would like to see some more demonstrations:

**NOTE: Please note that the sample content Table of Contents is broken but that's because the sources are incorrect, I couldn't find better working code and *ain't nobody got time* to fix that. JustTheMD works perfectly fine with custom TOC permalinks.**

## No configuration just the README.md

[Link to the Repository](https://github.com/Alan-FGR/JustTheMD-Sample)

[Link to the JustTheMD Page](https://alan-fgr.github.io/JustTheMD-Sample/)

## Advanced configuration with custom footer and external Markdown file

[Link to the Repository](https://github.com/Alan-FGR/JustTheMD-Sample-Advanced)

[Link to the JustTheMD Page](https://alan-fgr.github.io/JustTheMD-Sample-Advanced/)

# Showcase

- [ælum engine](https://github.com/Alan-FGR/aelum) - [JustTheMD](https://alan-fgr.github.io/aelum/)

More coming soon...

# Support

## TODO

- Handle links to local files
- Emojis

## Browser Compatibility

JustTheMD will run fine in any reasonaly standards compliant and updated browser.

## Issues and Contributions

Please feel free to open issues and submit PRs or contribute in any other form. Stars are very appreciated.

# Donate

Let's face it: you're not going to ( ͡° ͜ʖ ͡°) . "Donate" stars if you will ;).