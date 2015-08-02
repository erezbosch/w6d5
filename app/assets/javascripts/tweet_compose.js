$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$el.on("submit", this.handleSubmit.bind(this));
  this.$el.find('textarea').on("input", this.handleTextInput.bind(this));
  this.$el.find('a.add-mentioned-user').on("click", this.addMention.bind(this));
  this.$el.find('div.mentioned-users').on(
    "click",
    "a.remove-mention",
    this.removeMention.bind(this)
  )
}

$.TweetCompose.prototype.addMention = function () {
  this.$el.find('div.mentioned-users').append(this.$el.find('script').html());
}

$.TweetCompose.prototype.removeMention = function (e) {
  $(e.currentTarget).parent().remove();
}

$.TweetCompose.prototype.handleTextInput = function (e) {
  var $target = $(e.currentTarget);
  this.$el.find('.chars-left').text(140 - $target.val().length);
}

$.TweetCompose.prototype.handleSubmit = function (e) {
  e.preventDefault();
  var formJSON = this.$el.serializeJSON();
  this.$el.find(":input").prop("disabled", true);
  $.ajax({
    url: "/tweets/",
    method: "post",
    dataType: "json",
    data: formJSON,
    success: this.handleSuccess.bind(this)
  })
}

$.TweetCompose.prototype.clearInput = function () {
  this.$el.find(':input[type!="Submit"]').val("");
  this.$el.find('.mentioned-users').empty();
}

$.TweetCompose.prototype.handleSuccess = function (data) {
  this.clearInput();
  var $ul = $(this.$el.data("tweets-ul"));
  var $link = $("<a>")
    .attr("href", "/users/" + data.user_id)
    .text(data.user.username);
  var text = [data.content, $link.toString(), data.created_at].join(" -- ")
  var $li = $("<li>").text(text);
  $ul.append($li);
  this.$el.find(":input").prop("disabled", false);
}

$.fn.tweetCompose = function (options) {
  return this.each(function () {
    new $.TweetCompose(this, options);
  })
}

$(function () {
  $(".tweet-compose").tweetCompose({});
})
