var app = app || {};

app.criteriaView = Backbone.View.extend({
	
	initialize: function() {
			//this.listenTo(this.collection, 'change', view.render);
	},
	events: {
		"mousedown" : function(e) {	
			var mymodel = this.model;
			switch(e.target.id) {
				case "add_row":
					this.collection.create({ assessment_id : this.collection.assessment_id }, { wait : true });
				break;
			}
		}
	},

	template: _.template( $("#criteriaForm").html() ) ,
	render: function() {
		var learningActivitiesTemplate = this.template();
		this.$el.html(learningActivitiesTemplate);
		return this;
	},
	
});