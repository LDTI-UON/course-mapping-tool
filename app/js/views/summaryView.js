var app = app || {};

app.summaryView = Backbone.View.extend({
	template: _.template( $("#summaryForm").html() ) ,
	render: function() {
		var summaryTemplate = this.template();
		this.$el.html(summaryTemplate);
		return this;
	},
	
});