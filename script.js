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

    sets.forEach(set => {
    text = text.replace(new RegExp(set.from,'gi'), set.to)
    });

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
    infoHolder.append(`
    <div class="markdown-body loading-info">
    <img src="https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif"/>
    <h4>Loading JustTheMD...</h4>
    </div>`);
    infoHolder = $(".loading-info");
}

function isUrl(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
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
    var baseUrl = "https://"+username+".github.io/"+repoName+"/";
    if (!page) return baseUrl;
    // var slugified = slugify(page);
    // return baseUrl+"?"+slugified;
    return baseUrl+"?"+page;
}

function formatSourceUrl(page){
    var base = "https://github.com/"+username+"/"+repoName;
    if (!page) return base+"/";
    return base+"/blob/master/"+page;
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

var username;
var repoName;
var pageToLoad;
var sourceUrl;
var defaultPage;
function parseInfo() {
    log("Parsing information from URL")
    username = location.hostname.split(".")[0];
    var repoRegex = /github\.io\/(.*?)\//;
    repoName = repoRegex.exec($(location).attr('href'))[1];
    pageToLoad = getPageFromUrl();
    if (HasConfig()) {
        defaultPage = JustTheMD_Pages[Object.keys(JustTheMD_Pages)[0]];
        for (var page in JustTheMD_Pages) { 
            if (slugify(page) == pageToLoad) {
                pageToLoad = JustTheMD_Pages[page];
                break;
            }
        }
    }
    if (!pageToLoad) pageToLoad = defaultPage;
    sourceUrl = isUrl(pageToLoad) ? pageToLoad : formatSourceUrl(pageToLoad);
    log("Parsed username: "+username+", repository: "+repoName+" page: "+pageToLoad+" source: "+sourceUrl);
}

function genNavLinks() {
    if (!HasConfig())
        $("#pages-nav-list").append('<li><span>'+repoName+'</span></li>');
    else
        for (var page in JustTheMD_Pages) {
            var src = slugify(page);
            if (src == slugify(defaultPage)) src = null;
            $("#pages-nav-list").append('<li><a href="'+formatLink(src)+'"><span>'+page+'</span></a></li>');
        }
}

function loadPage(){
    genNavLinks();

    log("Loading data from: "+sourceUrl)
    $.get(sourceUrl)
    .done(function (gh_page){
    
        var md_html = $(gh_page).find(".markdown-body")[0].outerHTML;
        $(".loading-info").hide();
        $("#markdown").empty();
        $("#markdown").append(md_html);
    
        $(".anchor").each(function (){
            var id = $(this).attr('id');
            $(this).attr("id", id.replace("user-content-", ""));
        });
    
        $("a").each(function() {
            var link = $(this).attr('href');
            if (link){
                var isMd = link.slice(-3) == ".md";
                var isRel = !isUrl(link);
                if (isMd && isRel){
                    var page = shortenRelUrl(link);
                    var newLink = formatLink(page);
                    $(this).attr('href', newLink);
                }
                else if ((link)[0] == "#"){
                    //tocMap[] TODO: TOC map support (old version supports, but GitHub doesn't, so maybe unecessary)
                }
            }
        });
    
        if (location.hash) location.href = location.hash;
    })
    .fail(function(){log("ERROR: Couldn't load page: "+sourceUrl)});
}


// Working vars

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
        $("#repo-link").attr("href", formatSourceUrl());
        loadPage();
    })
    .fail(function() {log("ERROR: Couldn't load default template")});
}
else {
    showLoadingIndicator();
    parseInfo();
    loadPage();
}




