var app = app || {};

app.courses = app.CourseMapperCollection.extend({
		url: function() { 
            return this.serverUrl+"/course_mapping_tool/manager/index.php/courses"
        },
		model: app.course
});