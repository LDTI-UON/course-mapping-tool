var app = app || {};

app.mappedOutcome = app.CourseMapperModel.extend({
	urlRoot: function() {
		var course_id = this.get("course_id");
		return this.serverUrl+"/course_mapping_tool/manager/index.php/summary/"+course_id;
	},
	defaults: {
		name: '',
	},
	initialize: function(param) {
		this.course_id = param.course_id;
	},
	
});
