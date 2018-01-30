var app = app || {};

app.Router = Backbone.Router.extend({
		routes : {
			"home" : "home",
			"add_course" : "add_course",
			"edit_course/:course_id" : "edit_course",
			"learning_outcomes/:course_id" : "learning_outcomes",
			"learning_activities/:course_id" : "learning_activities",
			"assessments/:course_id" : "assessments",
			"criteria/:course_id/:assessment_id" : "criteria",
			"summary/:course_id" : "summary",
			"goback" : "goback",
		},	
        home: function() {
            var courses = new app.courses({ model : app.course });
            courses.fetch({data: { page:1, limit: 100 }, success: function(courses) {
                var homeListView = new app.courseListView({ collection: courses });	
                
                var homeView = _.template(  $("#homeForm").html() );
                var controls = _.template(  $("#homeControls").html() );
                
                $("#main").html("");
				$("#main").append(homeView);
				$("#main table").append(homeListView.render().el);
				$("#controls").html(controls);
                    
            }, 
        });
            
        },
		add_course: function() {
			var course = new app.course();
			course.save(course.toJSON(), {
			    success: function (course) {
			    	var addCourseView = new app.addCourseView({ model: course });
					var controls = _.template(  $("#addCourseControls").html() );
					controls = controls(course.toJSON());
					
					$("#main").html(addCourseView.render().el);
					$("#controls").html(controls);
					
					//window.currentCourse = course;
					
					addCourseView.delegateEvents();
			    }, 
			    error: function(_data) {
			    	alert("Server problem, please try again.");
			    }
			});
		},
		edit_course: function(course_id) {
			var courses = new app.courses({ model : app.course});
			var course = new app.course({id: course_id});
			course.fetch({success: function(course) {
				var addCourseView = new app.addCourseView({ model: course });
				var controls = _.template(  $("#addCourseControls").html() );
				
				controls = controls(course.toJSON());
				
				$("#main").html(addCourseView.render().el);
				$("#controls").html(controls);
				
				addCourseView.delegateEvents();
			}});
		},
		learning_outcomes: function(course_id) {
			//alert("jkd");
			var createLearningOutcomesView = function(learningOutcomes) {
				var learningOutcomesView = new app.learningOutcomesView({ collection: learningOutcomes });
				var learningOutcomesTable = new app.learningOutcomesTable({ collection: learningOutcomes });
				var controls = _.template( $("#learningOutcomesControls").html() );
				
				controls = controls({ course_id: learningOutcomes.course_id });

				$("#main").html("");
				$("#main").append(learningOutcomesView.render().el);
				$("#main table").append(learningOutcomesTable.render().el);
				$("#controls").html(controls);
				
				learningOutcomesTable.delegateEvents();
			}
			
			var learningOutcomes = new app.learningOutcomes({ model : app.learningOutcome }, {course_id: course_id});
			
			learningOutcomes.fetch({data: { page:1, limit: 100 }, success: function(learningOutcomes) {
				
				if(learningOutcomes.length === 0) {
					var learningOutcome = new app.learningOutcome({course_id: course_id});
					
					learningOutcomes.create(learningOutcome, { 
							success: function(_data) {
								createLearningOutcomesView(learningOutcomes);
							},
							error: function(_data) {
								alert("Server error, please try again.");
							}
						}	
					);
				} else {
					createLearningOutcomesView(learningOutcomes);
				}
				
			}});
		},
		learning_activities: function(course_id) {
			
			var createLearningActivitiesView = function(learningActivities) {
				var learningActivitiesView = new app.learningActivitiesView({ collection: learningActivities });
				var learningActivitiesTable = new app.learningActivitiesTable({ collection: learningActivities });
				var controls = _.template( $("#learningActivitiesControls").html() );
				
				controls = controls({ course_id: learningActivities.course_id });

				$("#main").html("");
				$("#main").append(learningActivitiesView.render().el);
				$("#main table").append(learningActivitiesTable.render().el);
				$("#controls").html(controls);
				$("select").chosen(); //nice select boxes
			}
			
			var learningActivities = new app.learningActivities({ model : app.learningActivity }, {course_id: course_id});
			
			learningActivities.fetch({data: { page:1, limit: 100 }, success: function(learningActivities) {
				
				if(learningActivities.length === 0) {
					var learningActivity = new app.learningActivity({course_id: course_id});
					
					learningActivities.create(learningActivity, { 
							success: function(_data) {
								createLearningActivitiesView(learningActivities);
							},
							error: function(_data) {
								alert("Server error, please try again.");
							}
						}	
					);
				} else {
					createLearningActivitiesView(learningActivities);
				}
			}});
		},
		assessments: function(course_id) {
			
			var createAssessmentsView = function(assessments) {
				var assessmentsView = new app.assessmentsView({ collection: assessments });
				var assessmentsTable = new app.assessmentsTable({ collection: assessments });
				var controls = _.template( $("#assessmentsControls").html() );
				
				controls = controls({ course_id: assessments.course_id });

				$("#main").html("");
				$("#main").append(assessmentsView.render().el);
				$("#main table").append(assessmentsTable.render().el);
				$("#controls").html(controls);
				$("select").chosen();
			}
			
			var assessments = new app.assessments({ model : app.assessment }, {course_id: course_id});
			
			assessments.fetch({data: { page:1, limit: 100 }, success: function(assessments) {
				
				if(assessments.length === 0) {
					var assessment = new app.assessment({course_id: course_id});
					
					assessments.create(assessment, { 
							success: function(_data) {
								createAssessmentsView(assessments);
							},
							error: function(_data) {
								alert("Server error, please try again.");
							}
						}	
					);
				} else {
					createAssessmentsView(assessments);
				}
			}});
		},
		criteria: function(course_id, assessment_id) {
			
			var createCriteriaView = function(criteria) {
				var criteriaView = new app.criteriaView({ collection: criteria });
				var criteriaTable = new app.criteriaTable({ collection: criteria });
				var controls = _.template( $("#criteriaControls").html() );
				
				controls = controls({ course_id: criteria.course_id });

				$("#main").html("");
				$("#main").append(criteriaView.render().el);
				$("#main table").append(criteriaTable.render().el);
				$("#controls").html(controls);
				$("select").chosen();
			}
			
			var criteria = new app.criteria({ model : app.criterion }, {course_id: course_id, assessment_id: assessment_id});
			
			criteria.fetch({data: { page:1, limit: 100 }, success: function(criteria) {
				
				if(criteria.length === 0) {
					var criterion = new app.criterion({assessment_id: assessment_id});
					
					criteria.create(criterion, { 
							success: function(_data) {
								createCriteriaView(criteria);
							},
							error: function(_data) {
								alert("Server error, please try again.");
							}
						}	
					);
				} else {
					createCriteriaView(criteria);
				}
			}});
		},
		summary: function(course_id) {
			
			var createSummaryView = function(outcomeBundle) {
				var summaryTable = new app.summaryTable(
					{ 
					   collection: outcomeBundle.learningOutcomes,
					   learningActivities: outcomeBundle.learningActivities, 
					   assessments: outcomeBundle.assessments
					}
				);
				
				var controls = _.template( $("#summaryControls").html() );
				controls = controls({ course_id: outcomeBundle.learningOutcomes.course_id });
				
				var summaryView = new app.summaryView({ collection: outcomeBundle.learningOutcomes });

				$("#main").html("");
				$("#main").append(summaryView.render().el);
				$("#main table").append(summaryTable.render().el);
				$("#controls").html(controls);
				$("select").chosen();
			}
			
			var learningOutcomes = new app.learningOutcomes({ model : app.learningOutcome }, {course_id: course_id});
			
			learningOutcomes.fetch({ data: { page:1, limit: 100 }, success: function(learningOutcome) {
				
					var learningActivities = new app.learningActivities(learningOutcome,{course_id: course_id});
					
						learningActivities.fetch({data: {page: 1, limit: 100} , success: function(learningActivities){
									var assessments = new app.assessments(learningOutcome, {course_id: course_id});	
									
										assessments.fetch({data: {page: 1, limit: 100} , success: function(assessments){
											//console.log(assessments);
												createSummaryView({ 
													learningOutcomes: learningOutcomes,  
													learningActivities: learningActivities,
													assessments: assessments,
												});
										}
									});
						}});
				}
			});
	  },
		
});