function create_posts(json) {

    for (var i = 0; i < randomposts_number; i++) {
        var newEntry = json.feed.entry[i];
        var randompoststitle = newEntry.title.$t;

        if ('content' in newEntry) {
            var randompostsnippet = newEntry.content.$t
        } else {
            if ('summary' in newEntry) {
                var randompostsnippet = newEntry.summary.$t
            } else {
                var randompostsnippet = "";
            }
        };

        randompostsnippet = randompostsnippet.replace(/<[^>]*>/g, "");
        if (randompostsnippet.length < randomposts_chars) {
            var randomposts_snippet = randompostsnippet
        } else {
            randompostsnippet = randompostsnippet.substring(0, randomposts_chars);
            var whitespace = randompostsnippet.lastIndexOf(" ");
            randomposts_snippet = randompostsnippet.substring(0, whitespace) + "&#133;";
        };

        for (var j = 0; j < newEntry.link.length; j++) {
            if ('thr$total' in newEntry) {
                var randomposts_commentsnum = newEntry.thr$total.$t + ' ' + randomposts_comments
            } else {
                randomposts_commentsnum = randomposts_commentsd
            }; if (newEntry.link[j].rel == 'alternate') {
                var randompostsurl = newEntry.link[j].href;
                var randomposts_date = newEntry.published.$t;
                if ('media$thumbnail' in newEntry) {
                    var randompoststhumb = newEntry.media$thumbnail.url;
                    var ListImage= "'" + randompoststhumb.replace("?imgmax=800","") + "'";
                } else {
                    randompoststhumb = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3xKPrWwK7et_0tq4VRJ8GJEs3vsqyKzA8Sc1tTxZcsg377GPQuXiep-vNbWUpUNrppN1Q2QUEKCf-Ld9rZRls8vMRgx6Xj9NRJX5xYmSz7qX1YrQ05pM9znGOtjOVN-_0qRrQWhVucT60x33_KGabaIF8KCQzUMTMXDDDp2K6epBNhhTZ33d1y5vKmuw/s358/image.jpg"
                }
            }
        };

        document.write('<div class="blog-post hentry index-post">');
        document.write('<a href="' + randompostsurl + '" rel="nofollow"><div class="post-image-wrap"><img alt="' + randompoststitle + '" src="' + ListImage + '"/></div><div class="post-info"><h2 class="post-title"> '+ randompoststitle +' </h2><div class="post-meta"></div></div></a></div>');
    }
};
getValue();
for (var i = 0; i < randomposts_number; i++) {
    document.write('<script type=\"text/javascript\" src=\"/feeds/posts/default?alt=json-in-script&start-index=' + randomposts_current[i] + '&max-results=1&callback=create_posts\"><\/script>')
};
