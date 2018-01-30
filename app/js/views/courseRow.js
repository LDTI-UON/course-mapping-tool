var app = app || {};

app.courseRow = CourseMapperView.extend({
	tagName: "tr",
	template: _.template( $("#courseRow").html() )	,
	controls: _.template( $("#addCourseControls").html() ), 
	render: function() {
		var courseRow = this.template(this.model.toJSON());
		this.$el.html(courseRow);
		return this;
	},
	events: {
		"mousedown" : function(e) { 
			if(e.target.id === "delete") {
				this.deleteCourse();
			} else {
				this.loadCourse();
			}
		},
	},
	loadCourse: 
		function() { 
			window.location.href = "#edit_course/"+this.model.get("id");
		}
	,
	deleteCourse: function() {
		
		var header = "<strong class='text-warning'>Warning! Completely delete this course forever?</strong>";
		var message = "This will delete this entire course and all its learning outcomes, activities, assessments and rubrics.";
		
		this.setDeleteAction(function() { this.model.destroy({success: function() { location.reload(); }});   });
		this.deleteDialog(header, message);
	},
	
	
});