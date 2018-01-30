var app = app || {};

app.assessmentRow = CourseMapperView.extend({
	tagName: "tr",
	template: _.template( $("#assessmentRow").html() )	,
	weekTemplate1: _.template( $("#assessmentWeekDefault").html() ),
	weekTemplate2:  _.template( $("#assessmentWeekAlt").html() ),
	events: {
		"change" : function(e) {
			switch(e.target.id) {
				case "name":
				case "details":
				case "week1":
				case "week2":
					var w1 = this.$el.find("#week1").val();
					var w2 = this.$el.find("#week2").val();
					this.$el.find("#week_type"+this.model.id+"_1").prop("checked", true);
					
					this.model.set("week", w1 + "_" + w2);
					this.validationCheck(e.target.id, e.target);
				break;	
				case "week":	
				case "learning_outcomes":	
					this.validationCheck(e.target.id, e.target);
				break;
				case "type":
					var v = this.$el.find("#week").val();
					this.updateWeekInputState( $(e.target).find(":selected").val(), v );
					
					this.validationCheck(e.target.id, e.target);
				break;
				case "weight":
					this.validationCheck(e.target.id, e.target, { divide: 100 });	
			}
			
			if(e.target.name == "week_radio"+this.model.id) {
				if(e.target.id == "week_type"+this.model.id+"_2") {
					this.model.set("week", "ongoing");
					this.validationCheck(e.target.id, e.target, { divide: 100 });	
				}
				if(e.target.id == "week_type"+this.model.id+"_1") {
					
					if(this.$el.find("#week1").val().length > 0 &&
					   this.$el.find("#week2").val().length > 0) 
					{
							this.$el.find("#week1").trigger("change");
					}
				}
			}
		},
	},
	updateWeekInputState: function(val, selected) {
		switch( val ) {
		case "summative":
		case "diagnostic":
			this.$el.find("#week1").parent().css({"width":"2em", "padding":"1em"});	
			this.$el.find("#week1").parent().html( this.weekTemplate1({ week: selected, id: this.model.id}) );
		break;
		case "formative":
			this.$el.find("#week").parent().css({"width":"12em", "padding":"1em"});	
			var week = this.model.get("week");
			if(week.length > 0) {
					if(week.indexOf("_") != -1) {
							var a = week.split("_");
							var week1 = typeof a[0] == 'undefined' ? 0 : a[0];
							var week2 = typeof a[1] == 'undefined' ? 0 : a[1];
							
							this.$el.find("#week").parent().html( this.weekTemplate2({ week: selected, id: this.model.id, radio1: 'checked="1"', radio2: '' }));
							
							this.$el.find("#week1").val(week1);
							this.$el.find("#week2").val(week2);
					} else {
						this.$el.find("#week").parent().html( this.weekTemplate2({ week: selected, id: this.model.id, radio1: '', radio2: 'checked="1"' }));
					}
				}
		}
	},
	render: function() {
		var _options = ["formative", "summative", "diagnostic"];
		var type = this.model.get("type").toLowerCase();
		var assessment_options = this.buildPredefOptions(_options, type);
		
		var v = this.$el.find("#week").val();
		
		var lo_options = this.buildLearningOutcomeOptions();
		var copy = this.model.toJSON();

		copy.learning_outcomes = lo_options;
		copy.type = assessment_options;
		
		var assessmentRow = this.template(copy);
		this.$el.html(assessmentRow);
		this.updateWeekInputState( type, v );
		
		return this;
	}
});