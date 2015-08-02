$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul");
  this.$input.on("input", this.handleInput.bind(this));
}

$.UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  $.ajax({
    url: "/users/search",
    method: "get",
    data: { query: this.$input.val() },
    dataType: "json",
    success: this.renderResults.bind(this)
  });
}

$.UsersSearch.prototype.renderResults = function (data) {
  this.$ul.empty();
  data.forEach(function (user) {
    var $a = $("<a>").attr("href", "/users/" + user.id).text(user.username);
    var $toggle = $("<button>").addClass("follow-toggle");
    // Where does the user followed attribute come from ???
    var followState = user.followed ? "followed" : "unfollowed";
    $toggle.followToggle({ userId: user.id, followState: followState });
    var $li = $("<li>").append($a).append($toggle);

    this.$ul.append($li);
  }.bind(this));
}

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
}

$(function () {
  $("div.users-search").usersSearch();
})
