var app = app || {};

app.criteria = app.CourseMapperCollection.extend({
	url: function() {
		return this.serverUrl+"/course_mapping_tool/manager/index.php/assessments/"+this.assessment_id+"/criteria";
	},
	model: app.criterion,
	initialize: function(_obj, options) {
		if(typeof options !== 'undefined') {
			this.assessment_id = options.assessment_id;
			this.course_id = options.course_id;
		} else {
			this.assessment_id =  parseInt(_obj.model.get("assessment_id"));
			this.course_id = parseInt(_obj.model.get("course_id"));
		}
	}
});