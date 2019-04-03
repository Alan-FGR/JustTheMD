

function getRawFileUrl(fileName){
    return "https://raw.githubusercontent.com/"+username+"/"+repoName+"/master/"+(fileName.replace(/^\/+/,''));
}

function getConfigUrl(){
    return getRawFileUrl("markdown-pages.txt");
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

    var converter = new showdown.Converter(
        {tables: true, strikethrough: true, noHeaderId: true,
            simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true,
            tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, ghMentions: true,
            parseImgDimensions: true}
        );
    var md_html = converter.makeHtml(md);
    $("#markdown").html(md_html);
    $(":header").prepend(function (){
        var id = slugify($(this).text());
        if (id in TocAnchorMap) id = TocAnchorMap[id];
        return `
        <a class="anchor" id="`+ id +`" href="#`+ id +`" aria-hidden="true">
        <svg class="octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
        <path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
        </path>
        </svg>
        </a>
        `;
    });
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
