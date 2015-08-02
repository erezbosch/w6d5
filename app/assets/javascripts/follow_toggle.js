$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.$el.on("click", this.handleClick.bind(this));
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;

  this.render();
}

$.FollowToggle.prototype.render = function () {
  var text = this.followState[0] === "f" ? "Unfollow!" : "Follow!";
  this.$el.text(text);
  if (this.followState === "unfollowing" || this.followState === "following") {
    this.$el.prop("disabled", true);
  } else {
    this.$el.prop("disabled", false);
  }
}

$.FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  this.followState = this.followState === "followed" ? "unfollowing" : "following";
  this.render();
  if (this.followState === "unfollowing") {
    $.ajax({
      url: "/users/" + this.userId + "/follow",
      method: "delete",
      dataType: "json",
      success: function () {
        this.followState = "unfollowed";
        this.render();
      }.bind(this)
    })
  } else {
    $.ajax({
      url: "/users/" + this.userId + "/follow",
      method: "post",
      dataType: "json",
      success: function () {
        this.followState = "followed";
        this.render();
      }.bind(this)
    })
  }
}

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
})
