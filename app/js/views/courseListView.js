var app = app || {};

app.courseListView = Backbone.View.extend({
	tagName: "tbody",
	initialize: function() {
		this.listenTo(app.courses, "change", this.render);
	},
    render: function() {
    	this.$el.html("");
    	this.collection.each(this.addCourse, this);
    	return this;
    },
    addCourse: function(course) {
    	var courseRow = new app.courseRow({ model: course });
    	this.$el.append(courseRow.render().el);
    }
});