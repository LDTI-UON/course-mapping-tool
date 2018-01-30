var app = app || {};

app.learningOutcomesView = Backbone.View.extend({
	
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

	template: _.template( $("#learningOutcomesForm").html() ) ,
	render: function() {
		var learningOutcomesTemplate = this.template();
		this.$el.html(learningOutcomesTemplate);
		return this;
	},
	
});