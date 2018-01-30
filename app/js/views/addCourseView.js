var app = app || {};

app.addCourseView = CourseMapperView.extend({
	initialize: function() {
		
	},
	events: {
		"change" : function(e) {
			var mymodel = this.model;
			
			switch(e.target.id) {
				case "name":
				case "code":
				case "duration":
					this.validationCheck(e.target.id, e.target);
			}
		}
	},
	template: _.template( $("#addCourseForm").html() ) ,
	render: function() {
		var addCourseFormTemplate = this.template(this.model.toJSON());
		this.$el.html(addCourseFormTemplate);
		
		//$("#main textarea").expandTextarea();
		return this;
	}
});