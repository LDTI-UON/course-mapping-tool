var app = app || {};

app.criterionRow = CourseMapperView.extend({
	tagName: "tr",
	template: _.template( $("#criterionRow").html() )	,
	events: {
		"change" : function(e) {
			var mymodel = this.model;
			
			switch(e.target.id) {
				case "description":
				case "col1":
				case "col2":
				case "col3":
				case "col4":
				case "col5":
					this.validationCheck(e.target.id, e.target);
			}
			
		},
		
	},
	render: function() {
		var criterionRow = this.template(this.model.toJSON());
		this.$el.html(criterionRow);
		return this;
	}
});