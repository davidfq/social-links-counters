# Social share links counters

Another take on jquery plugins like [sharrre.com](http://sharrre.com/) or [social-likes](https://github.com/sapegin/social-likes), using a **progressive enhancement** approach. Just plain simple HTML links for social sharing, instead of empty elements.

## Usage

If you have a link like this in your page:

    <a class="social-share" href="https://www.twitter.com/intent/tweet?url=[url]">share on twitter</a>

Initialize the plugin:

    $('.social-share').socialShareCounters({
      innerSpan: true,
      spanClass: 'social-share__counter'
    });

And the original link becomes in:

    <a class="social-share" data-counter="[count]" href="https://www.twitter.com/intent/tweet?url=[url]">share on twitter <span class="social-share__counter">[count]<span></a>

## TODO

- Add "popup" option.
- Add more social networks (currently 0.2.0, only Twitter and Facebook are
  supported).
- Trigger custom events when counters are ready.
- Add Google Analytics support.

## Resources

- [Gist with API calls](https://gist.github.com/jonathanmoore/2640302) for
share counts.
- Facebook sharer url: `https://facebook.com/sharer/sharer.php?u=[url]`
- [Twitter web intent docs](https://dev.twitter.com/web/tweet-button/web-intent),
intent tweet url: `https://www.twitter.com/intent/tweet?url=[url]`
- http://codepen.io/andreasstorm/pen/iefKk/
