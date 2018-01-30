var app = app || {};

app.learningOutcomes = app.CourseMapperCollection.extend({
	url: function() {
		var course_id = this.course_id;
		return this.serverUrl+"/course_mapping_tool/manager/index.php/summary/"+course_id+"/learning_outcomes";
	},
	model: app.learningOutcome,
	initialize: function(_obj, options) {
		
		if(typeof options !== 'undefined') {
			this.course_id = options.course_id;
		} else {
			this.course_id = parseInt(_obj.model.get("course_id"));
		}
	}
});