var app = app || {};

app.learningOutcomeRow = CourseMapperView.extend({
	tagName: "tr",
	template: _.template( $("#learningOutcomeRow").html() )	,
	events: {
		"change" : function(e) {
			var mymodel = this.model;
			
			switch(e.target.id) {
				case "name":
				case "details":
					this.validationCheck(e.target.id, e.target);
			}
		},
		
	},
	render: function() {
		
		var learningOutcomeRow = this.template(this.model.toJSON());
		this.$el.html(learningOutcomeRow);
		return this;
	}
});