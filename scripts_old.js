

function getRawFileUrl(fileName){
    return "https://raw.githubusercontent.com/"+username+"/"+repoName+"/master/"+(fileName.replace(/^\/+/,''));
}

function formatLink(page){
    var baseUrl = "https://"+username+".github.io/"+repoName+"/";
    if (!page) return baseUrl;
    var slugified = slugify(page);
    return baseUrl+"?"+slugified;
}

var TocAnchorMap = {}

function setPageMarkdown(md) {
    log("Converting Markdown")

    var linkRegex = /\[([^\[\]]+)\]\(([^)]+)/gm
    var match;
    while ((match = linkRegex.exec(md)) != null) {
        if (match.length > 2 && match[2][0] == "#")
            TocAnchorMap[slugify(match[1])] = match[2].slice(1);
    }

}

var confURL = getConfigUrl();
log("Loading JustTheMD configuration from "+confURL);

var confPages = {}
var page = getPage();

var confRequest = $.get(confURL);

confRequest.done(function (confFile) {

    log("Configuration file found!");

    lines = confFile.split("\n");

    var footNote = lines[0];

    $("#footnote").html(footNote);

    for (var i = 1; i < lines.length; i++) {
        line = lines[i];
        if (!line) continue;
        split = line.split("=");
        var pageName = split[0].trim();
        var fileURL = split[1].trim();
        if (!isUrl(fileURL)) fileURL = getRawFileUrl(fileURL);
        var pageSlug = slugify(pageName);
        if (page == null) page = pageSlug;
        if (pageSlug == page) document.title = pageName;
        confPages[pageSlug] = fileURL;
        $("#pages-nav-list").append('<li><a href="'+formatLink(i == 1 ? null : pageName)+'"><span>'+pageName+'</span></a></li>')
    }

    if (!page) log("ERROR: No configured page found!")

    log("Configured pages: "+Object.keys(confPages).length);

    var pageURL = confPages[page];

    if (!pageURL) log("ERROR: Can't load configuration for page: " + page);

    log("Loading page: '"+page+"' from: "+pageURL);

    $.get(pageURL)
        .done(function (md) { setPageMarkdown(md); })
        .fail(function() { log("ERROR: Couldn't load page markdown"); });
});
