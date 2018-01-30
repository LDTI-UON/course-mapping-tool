var app = app || {};

app.learningActivitiesView = Backbone.View.extend({
	
	initialize: function() {
			//this.listenTo(this.collection, 'change', view.render);
	},
	events: {
		"mousedown" : function(e) {	
			var mymodel = this.model;
			switch(e.target.id) {
				case "add_row":
					this.collection.create({ course_id : this.collection.course_id }, { wait : true });
				break;
			}
		}
	},

	template: _.template( $("#learningActivitiesForm").html() ) ,
	render: function() {
		var learningActivitiesTemplate = this.template();
		this.$el.html(learningActivitiesTemplate);
		return this;
	},
	
});