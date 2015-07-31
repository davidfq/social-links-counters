/*!
 * Social share links counters
 */
;(function ($, window, document, undefined) {

  var pluginName = 'socialShareCounters',
    defaults = {
      innerSpan: true,
      spanClass: pluginName + '__counter'
    },
    cache = {},
    providers = [
      {
        name : 'twitter',
        host : /(www\.)?(twitter\.com)$/,
        shareParam : 'url',
        counterUrl : 'https://cdn.api.twitter.com/1/urls/count.json?url=',
        responseKey : 'count'
      },
      {
        name : 'facebook',
        host : /(www\.)?(facebook\.com)$/,
        shareParam : 'u',
        counterUrl : 'http://graph.facebook.com/?id=',
        responseKey : 'shares'
      }
    ];

  function Plugin( element, options ) {
    this.element = element;
    this.$element = $(element);

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function() {

      // ensure that we're handling a link with params
      if (this.element.tagName === 'A' &&
          this.element.search !== '') {

        // save span class option as data attribute before update
        // counters in inner span elements
        if (this.options.innerSpan) {
          this.$element.data('span-class', this.options.spanClass);
        }

        this.parseLink(this.element);
      }
    },
    parseLink: function(el) {
      var host = el.host,
        pairs = el.search.substring(1).split("&");

      for (var i = 0; i < providers.length; i++) {
        // look for host in providers
        if (providers[i].host.test(host)) {
          if (!cache[el.href]) {
            var link = {
              counter : 0,
              provider : providers[i]
            };
            // get the url share param for the current provider
            for (var j = 0; j < pairs.length; j++) {
              var pair = pairs[j].split("=");
              if (providers[i].shareParam === pair[0]) {
                link.url = pair[1];
                break;
              }
            }
            // dead simple cache, stash the data before getting the
            // counter, this way each counter is requested only once
            // for all links with the same share url
            cache[el.href] = link;
            this.getCounter(el, link);
          }
        }
      }
    },
    getCounter: function(el, link) {
      var url = link.provider.counterUrl + link.url + '&callback=?',
        updateCounters = this.updateCounters,
        options = this.options;

      $.getJSON(url)
        .done(function(data) {
          var count = data[link.provider.responseKey];
          link.counter = typeof count !== 'number' ? 0 : count;
          updateCounters(el, options);
        });
    },
    updateCounters: function(el, options) {
      // update all links using its url as selector
      $('a[href="'+el.href+'"]').each(function() {
        var $el = $(this),
          link = cache[el.href],
          spanClass = $el.data('span-class');

        $el.data("counter", link.counter);

        if (spanClass) {
          if ($el.find(spanClass).length === 0) {
            $el.append($('<span>')
              .addClass(spanClass)
              .text(link.counter));
          } else {
            $el.find(spanClass).text(link.counter);
          }
        }
      });
    }
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new Plugin( this, options ));
      }
    });
  };

})(jQuery, window, document);
