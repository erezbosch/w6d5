$.InfiniteTweets = function (el) {
  this.$el = $(el);
  this.$el.find('a.fetch-more').on("click", this.fetchTweets.bind(this));
  this.maxCreatedAt = null;
}

$.InfiniteTweets.prototype.fetchTweets = function () {
  $.ajax({
    url: "/feed",
    method: "get",
    dataType: "json",
    data: { max_created_at: this.maxCreatedAt },
    success: this.insertTweets.bind(this)
  });

}

$.InfiniteTweets.prototype.insertTweets = function (data) {
  var $ul = $('ul#feed');
  data.forEach(function (tweet) {
    $ul.append('<li>' + JSON.stringify(tweet) + '</li>');
  });
  this.maxCreatedAt = data[data.length - 1].created_at;
}

$.fn.infiniteTweets = function () {
  return this.each(function () {
    new $.InfiniteTweets(this);
  })
}

$(function () {
  $(".infinite-tweets").infiniteTweets();
})
