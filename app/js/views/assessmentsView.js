var app = app || {};

app.assessmentsView = Backbone.View.extend({
	
	initialize: function() {
			//this.listenTo(this.collection, 'change', view.render);
	},
	events: {
		"mousedown" : function(e) {	
			var mymodel = this.model;
			switch(e.target.id) {
				case "add_row":
					this.collection.create({ course_id : this.collection.course_id }, { wait : true });
			}
		}
	},

	template: _.template( $("#assessmentsForm").html() ) ,
	render: function() {
		var assessmentsTemplate = this.template();
		this.$el.html(assessmentsTemplate);
		return this;
	},
	
});