function slugify(text) {
    text = text.toString().toLowerCase().trim();

    const sets = [
    {to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]'},
    {to: 'c', from: '[ÇĆĈČ]'},
    {to: 'd', from: '[ÐĎĐÞ]'},
    {to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'},
    {to: 'g', from: '[ĜĞĢǴ]'},
    {to: 'h', from: '[ĤḦ]'},
    {to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]'},
    {to: 'j', from: '[Ĵ]'},
    {to: 'ij', from: '[Ĳ]'},
    {to: 'k', from: '[Ķ]'},
    {to: 'l', from: '[ĹĻĽŁ]'},
    {to: 'm', from: '[Ḿ]'},
    {to: 'n', from: '[ÑŃŅŇ]'},
    {to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'},
    {to: 'oe', from: '[Œ]'},
    {to: 'p', from: '[ṕ]'},
    {to: 'r', from: '[ŔŖŘ]'},
    {to: 's', from: '[ßŚŜŞŠ]'},
    {to: 't', from: '[ŢŤ]'},
    {to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'},
    {to: 'w', from: '[ẂŴẀẄ]'},
    {to: 'x', from: '[ẍ]'},
    {to: 'y', from: '[ÝŶŸỲỴỶỸ]'},
    {to: 'z', from: '[ŹŻŽ]'},
    {to: '-', from: '[·/_,:;\']'}
    ];

    for (var i = 0; i < sets.length; i++) {
        const set = sets[i];
        text = text.replace(new RegExp(set.from, 'gi'), set.to)
    }

    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')    
    .replace(/&/g, '-and-')  
    .replace(/[^\w\-]+/g, '')
    .replace(/\--+/g, '-')   
    .replace(/^-+/, '')      
    .replace(/-+$/, '');     
}

function log(text){
    console.log(text);
    infoHolder.append(text+" ...<br/>");
}

function showLoadingIndicator(){
    infoHolder.append('<div class="markdown-body loading-info"><img src="https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif"/><h4>Loading JustTheMD...</h4></div>');
    infoHolder = $(".loading-info");
}

function isUrl(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function locationObjFromUrl(url) {
    var loc = document.createElement('a');
    loc.href = url;
    loc.pathname = loc.pathname.replace(/(^\/?)/, "/"); //bugfix
    return loc;
    // REFERENCE:
    // url.protocol; //(http:)
    // url.hostname; //(www.example.com)
    // url.pathname; //(/some/path)
    // url.search; // (?name=value)
    // url.hash; //(#anchor)
}

function splitAndRetValid(str){
    var split = str.split("/");
    if (!split[0]) split = split.slice(1);
    return split;
}

function userAndRepoFromUrl(url, skipCustom) {
    var loc = locationObjFromUrl(url);

    // Hack to add custom domain support. TODO: make configurable
    if (!skipCustom && isCustomUrl) {
        var split = loc.pathname.split("/");
        return ["alan-fgr", split[1]];
    }

    if (loc.hostname.split(".").indexOf("io") !== -1)
        return [loc.hostname.split(".")[0], splitAndRetValid(loc.pathname)[0]];
    else {
        var split = splitAndRetValid(loc.pathname);
        return split.slice(0,2);
    }
}

function rawifyResource(resource){
    var loc = locationObjFromUrl(resource);
    if (loc.hostname.split(".").indexOf("github") !== -1){
        var resRel = shortenRelUrl(loc.pathname);
        var userRepo = userAndRepoFromUrl(resource, true);
        return formatRawSourceUrl(resRel, userRepo[0], userRepo[1]);
    }
    return resource;
}

function shortenRelUrl(url){
    var split = url.split("/");
    if (!split[0]) split = split.slice(1);
    if (split.length > 4){
        // 0 = user_or_project / 1 = repo / 2 = commit / 3 = branch
        short = split.slice(4).join("/");
        return short;
    }
    log("couldn't shorten relative URL: "+url);
}

function formatLink(page){
    // var baseUrl = "https://"+username+".github.io/"+repoName+"/";
    //var baseUrl = ""+repoName+"/";

    if (isCustomUrl && page == repoName)
        return "/" + repoName;

    var baseUrl = "";
    if (!page) return "/"+repoName;
    // var slugified = slugify(page);
    // return baseUrl+"?"+slugified;
    return baseUrl+"?"+page;
}

function formatRepoUrl(page){
    var base = "https://github.com/"+username+"/"+repoName;
    if (!page) return base+"/";
    return base+"/blob/master/"+page;
}

function formatRawSourceUrl(resource, username_, repoName_){
    if (!username_) username_ = username;
    if (!repoName_) repoName_ = repoName;
    if (resource == null) return formatRawSourceUrl("README.md");
    if (isUrl(resource)) return rawifyResource(resource);
    return "https://raw.githubusercontent.com/"+username_+"/"+repoName_+"/master/"+resource;
}

function getPageFromUrl() {
    var url = $(location).attr('href');
    var pageRegex = /\?(.*?)(#|$)/;
    var pageMatches = pageRegex.exec(url);
    if (pageMatches == null || pageMatches.length < 2) return null;
    return pageMatches[1];
}

function HasConfig(){
    return (typeof JustTheMD_Pages != 'undefined');
}

var isCustomUrl;
var username;
var repoName;
var pageToLoad;
var sourceUrl;
var defaultPage;
function parseInfo() {
    log("Parsing information from URL")
    // username = location.hostname.split(".")[0];
    // var repoRegex = /github\.io\/(.*?)\//;
    // repoName = repoRegex.exec($(location).attr('href'))[1];

    var url = $(location).attr('href');

    isCustomUrl = url.indexOf("github.io/") === -1;

    var userAndRepo = userAndRepoFromUrl(url, false);
    username = userAndRepo[0];
    repoName = userAndRepo[1];

    pageToLoad = getPageFromUrl();
    if (HasConfig()) {
        defaultPage = Object.keys(JustTheMD_Pages)[0];
        for (var page in JustTheMD_Pages) { 
            if (slugify(page) == pageToLoad) {
                pageToLoad = JustTheMD_Pages[page];
                break;
            }
        }
        if (!pageToLoad) pageToLoad = JustTheMD_Pages[defaultPage];
    }
    sourceUrl = formatRawSourceUrl(pageToLoad);
    log("Parsed username: "+username+", <br/>repository: "+repoName+
    " <br/>page: "+pageToLoad+" <br/>source: "+sourceUrl);
}

function genNavLinks() {
    if (!HasConfig())
        $("#pages-nav-list").append('<li><span>'+repoName+'</span></li>');
    else
        for (var page in JustTheMD_Pages) {
            var src = slugify(page);
            if (src == slugify(defaultPage)) {
                if (isCustomUrl)
                    src = repoName;
                else
                    src = null;
            }
            $("#pages-nav-list").append('<li><a href="'+formatLink(src)+'"><span>'+page+'</span></a></li>');
        }
}

function loadPage(){
    genNavLinks();

    log("Loading data from: "+sourceUrl)
    $.get(sourceUrl)
    .done(function (md){
    
        log("Data loaded. Converting markdown");
        var converter = new showdown.Converter({
                tables: true,
                strikethrough: true,
                noHeaderId: true,
                simplifiedAutoLink: true,
                excludeTrailingPunctuationFromURLs: true,
                tablesHeaderId: true,
                ghCodeBlocks: true,
                tasklists: true,
                ghMentions: true,
                parseImgDimensions: true
            });
        var md_html = converter.makeHtml(md);

        $(".loading-info").slideUp();

        $("#markdown").append('<article class="markdown-body"></article>');
        $("#markdown > article").append(md_html);

        if (typeof emojify != 'undefined') {
            emojify.setConfig({
                img_dir: 'https://github.githubassets.com/images/icons/emoji',
                ignore_emoticons: true
            })
            emojify.run($("#markdown > article")[0]);
        }

        if (typeof hljs != 'undefined'){
            $("#markdown pre code").each(function(){hljs.highlightBlock($(this)[0])});
        }

        $(":header").prepend(function (){
            var id = slugify($(this).text());
            //if (id in TocAnchorMap) id = TocAnchorMap[id];
            return '<a class="anchor" id="'+ id +'" href="#'+ id +'" aria-hidden="true"><svg class="octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>';
        });
    
        // $("#markdown .anchor").each(function (){
        //     var id = $(this).attr('id');
        //     $(this).attr("id", id.replace("user-content-", ""));
        // });
    
        $("#markdown a").each(function() {
            var link = $(this).attr('href');
            if (link){
                var isMd = link.slice(-3) == ".md";
                var isRel = !isUrl(link);
                var isAnc = (link)[0] == "#";
                if (isMd && isRel && !isAnc) {
                    for (var page in JustTheMD_Pages) {
                        if (JustTheMD_Pages[page] == link) {
                            link = slugify(page);
                            break;
                        }
                    }
                    $(this).attr('href', '?' + link);
                }
                else if (isMd && !isAnc && !isRel){
                    //$(this).attr('href', '?' + link);
                }
                else if (!isMd && !isAnc && isRel){
                    $(this).attr('href', formatRepoUrl(link));
                }
                else if (!isMd && isRel && !isAnc && (link)[0] == "/"){
                    // var rawLink = formatRawSourceUrl(link);
                    // $(this).attr('href', rawLink);
                }
                else if (false){
                    //tocMap[] TODO: TOC map support (old version supports, but GitHub doesn't, so maybe unecessary)
                }
            }
        });

        $("#markdown img").each(function() {
            var src = $(this).attr('src');
            if (src){
                var isRel = !isUrl(src);
                var isLoc = (src)[0] == "/";
                if (isRel){
                    var rawLink = formatRawSourceUrl(src);
                    $(this).attr('src', rawLink);
                }
            }
        });
    
        if (location.hash) location.href = location.hash;

        document.title = HasConfig() ? defaultPage : repoName;

    })
    .fail(function(){log("ERROR: Couldn't load page: "+sourceUrl)});
}


// 

var isBodyEmpty = true;
$("body").children().each(function (index, element) {
    if (!($(element).is("script"))) {
        isBodyEmpty = false;
        return false; //break
    }
});
var infoHolder = isBodyEmpty ? $("body") : $("#markdown");

// Processing

if (isBodyEmpty) {
    var templUrl = "https://raw.githubusercontent.com/Alan-FGR/JustTheMD/master/index_default_theme.html";
    log("Body is empty, loading body from "+templUrl);
    $.get(templUrl)
    .done(function(file) {
        var contentRegex = /<header([\s\S]*?)\/footer>/;
        var content = contentRegex.exec(file)[0];
        $("body").empty();
        $("body").append(content);
        infoHolder = $("#markdown");
        showLoadingIndicator();
        parseInfo();
        var footer = 'Automatically generated by <a href="https://github.com/Alan-FGR/JustTheMD">JustTheMD</a>';
        if (typeof JustTheMD_Footer != 'undefined')
            footer = JustTheMD_Footer+"<br/>"+footer;
        $("#footnote").html(footer);
        $("#repo-link").attr("href", formatRepoUrl());
        loadPage();
    })
    .fail(function() {log("ERROR: Couldn't load default template")});
}
else {
    showLoadingIndicator();
    parseInfo();
    loadPage();
}




