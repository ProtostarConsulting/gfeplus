angular.module("prostudyApp").factory('appEndpointSF', appEndpointSF);

function appEndpointSF($log, localDBServiceFactory, googleEndpointSF) {
	// When app is in test mode, it will return service from local db store.
	// Else actual google end points.

	// var isTestMode = true;
	var isTestMode = false;

	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services

	endpointFactory.getGFBookStockService = function() {
		if (isTestMode)
			return localDBServiceFactory.getGFBookStockService();
		else
			return googleEndpointSF.getGFBookStockService();
	};
	// ----------------------------------------------------
	endpointFactory.getGFCourierService = function() {
		if (isTestMode)
			return localDBServiceFactory.getGFCourierService();
		else
			return googleEndpointSF.getGFCourierService();
	};
	// ----------------------------------------------------
	endpointFactory.getGFStudentService = function() {
		if (isTestMode)
			return localDBServiceFactory.getGFStudentService();
		else
			return googleEndpointSF.getGFStudentService();
	};
	// ----------------------------------------------------
	endpointFactory.getuploadURLService = function() {
		if (isTestMode)
			return localDBServiceFactory.getuploadURLService();
		else
			return googleEndpointSF.getuploadURLService();
	};
	// ----------------------------------------------------

	endpointFactory.getProtostarAdminService = function() {

		if (isTestMode)
			return localDBServiceFactory.getProtostarAdminService();
		else
			return googleEndpointSF.getProtostarAdminService();
	};

	endpointFactory.getScheduledStudentExamService = function() {

		if (isTestMode)
			return localDBServiceFactory.getScheduledStudentExamService();
		else
			return googleEndpointSF.getScheduledStudentExamService();
	};

	/*
	 * endpointFactory.getuploadURLService = function() {
	 * 
	 * if (isTestMode) return localDBServiceFactory.getuploadURLService(); else
	 * return googleEndpointSF.getuploadURLService(); };
	 */
	endpointFactory.getPartnerSchoolService = function() {

		if (isTestMode)
			return localDBServiceFactory.getPartnerSchoolService();
		else
			return googleEndpointSF.getPartnerSchoolService();
	};

	endpointFactory.getLocalUserService = function() {
		return localDBServiceFactory.getLocalUserService();
	};

	endpointFactory.getUserService = function() {

		if (isTestMode)
			return localDBServiceFactory.getUserService();
		else
			return googleEndpointSF.getUserService();
	};

	endpointFactory.getCertificateService = function() {

		if (isTestMode)
			return localDBServiceFactory.getCertificateService();
		else
			return googleEndpointSF.getCertificateService();
	};

	
	endpointFactory.getSubjectService = function() {

		if (isTestMode)
			return localDBServiceFactory.getSubjectService();
		else
			return googleEndpointSF.getSubjectService();
	};

	endpointFactory.getStudSubService = function() {

		if (isTestMode)
			return localDBServiceFactory.getStudSubService();
		else
			return googleEndpointSF.getStudSubService();
	};

	endpointFactory.getChapterService = function() {
		if (isTestMode)
			return localDBServiceFactory.getChapterService();
		else
			return googleEndpointSF.getChapterService();
	};

	endpointFactory.getBookService = function() {
		if (isTestMode)
			return localDBServiceFactory.getBookService();
		else
			return googleEndpointSF.getBookService();
	};

	endpointFactory.getSyllabusService = function() {
		if (isTestMode)
			return localDBServiceFactory.getSyllabusService();
		else
			return googleEndpointSF.getSyllabusService();
	};

	endpointFactory.getPracticeExamService = function() {
		if (isTestMode)
			return localDBServiceFactory.getPracticeExamService();
		else
			return googleEndpointSF.getPracticeExamService();
	};

	endpointFactory.getScheduledQuestionService = function() {
		if (isTestMode)
			return localDBServiceFactory.getScheduledQuestionService();
		else
			return googleEndpointSF.getScheduledQuestionService();
	};

	endpointFactory.getScheduledExamService = function() {
		if (isTestMode)
			return localDBServiceFactory.getScheduledExamService();
		else
			return googleEndpointSF.getScheduledExamService();
	};
	endpointFactory.getScheduledExamResultService = function() {
		if (isTestMode)
			return localDBServiceFactory.getScheduledExamResultService();
		else
			return googleEndpointSF.getScheduledExamResultService();
	};
	endpointFactory.getAttendanceService = function() {
		if (isTestMode)
			return localDBServiceFactory.getAttendanceService();
		else
			return googleEndpointSF.getAttendanceService();
	};

	endpointFactory.getStudentService = function() {
		if (isTestMode)
			return localDBServiceFactory.getStudentService();
		else
			return googleEndpointSF.getStudentService();
	};
	endpointFactory.getPaymentService = function() {
		if (isTestMode)
			return localDBServiceFactory.getPaymentService();
		else
			return googleEndpointSF.getPaymentService();
	};

	endpointFactory.getInstituteService = function() {
		if (isTestMode)
			return localDBServiceFactory.getInstituteService();
		else
			return googleEndpointSF.getInstituteService();
	};

	endpointFactory.getQuestionService = function() {
		if (isTestMode)
			return localDBServiceFactory.getQuestionService();
		else
			return googleEndpointSF.getQuestionService();
	};	

	endpointFactory.getAuthorizationService = function() {
		if (isTestMode)
			return localDBServiceFactory.getAuthorizationService();
		else
			return googleEndpointSF.getAuthorizationService();
	};

	endpointFactory.loadAppGoogleServices = function(deferred) {
		$log.debug("###Inside Google appEndpointSF.loadAppGoogleServices###");

		if (isTestMode) {
			$log.debug("isTestMode: " + isTestMode);
			deferred.resolve();
			return deferred.promise;
		}

		if (endpointFactory.is_service_ready) {
			$log.debug("Already Initialized returning back...");
			deferred.resolve();
			return deferred.promise;
		}

		var apiRoot = '//' + window.location.host + '/_ah/api';

		var apisToLoad;

		apisToLoad = 4; // must match number of calls to

		gapi.client.load('userService', 'v0.1', function() {
			$log.debug("userService Loaded......");

		}, apiRoot);

		/*gapi.client.load('chapterService', 'v0.1', function() {
			$log.debug("ChapterService Loaded....");

		}, apiRoot);

		gapi.client.load('bookService', 'v0.1', function() {
			$log.debug("BookService Loaded....");

		}, apiRoot);

		gapi.client.load('studentService', 'v0.1', function() {
			$log.debug("StudentService Loaded....");

		}, apiRoot);*/
		
		/*	gapi.client.load('standardService', 'v0.1', function() {
			$log.debug("StandardService Loaded......");

		}, apiRoot);

		gapi.client.load('paymentService', 'v0.1', function() {
			$log.debug("paymentService Loaded....");
		}, apiRoot);*/

		/*gapi.client.load('questionService', 'v0.1', function() {
			$log.debug("QuestionService Loaded....");

		}, apiRoot);

		gapi.client.load('practiceExamService', 'v0.1', function() {
			$log.debug("PracticeExamService Loaded....");

		}, apiRoot);*/
		
		/*
		gapi.client.load('scheduledQuestionService', 'v0.1', function() {
			$log.debug("ScheduledQuestionService Loaded....");

		}, apiRoot);
		gapi.client.load('scheduledExamService', 'v0.1', function() {
			$log.debug("ScheduledExamService Loaded....");

		}, apiRoot);

		gapi.client.load('scheduledExamResultService', 'v0.1', function() {
			$log.debug("ScheduledExamResultService Loaded....");

		}, apiRoot);

		/*gapi.client.load('syllabusService', 'v0.1', function() {
			$log.debug("syllabusService Loaded......");

		}, apiRoot);

		*/

		gapi.client.load('instituteService', 'v0.1', function() {
			$log.debug("InstituteService Loaded......");

		}, apiRoot);

		/*gapi.client.load('attendanceService', 'v0.1', function() {
			$log.debug("AttendanceService Loaded......");

		}, apiRoot);

		
		gapi.client.load('isionService', 'v0.1', function() {
			$log.debug("DivisionService Loaded......");

		}, apiRoot);

		gapi.client.load('subjectService', 'v0.1', function() {
			$log.debug("SubjectService Loaded......");

		}, apiRoot);*/

		// This loads google chart api
		google.charts.load('43', {
			packages : [ 'corechart' ]
		});

		/*gapi.client.load('certificateService', 'v0.1', function() {
			$log.debug("CertificateService Loaded......");
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('studSubService', 'v0.1', function() {
			$log.debug("StudSubService Loaded......");
			deferred.resolve();

		}, apiRoot);*/

		/*gapi.client.load('partnerSchoolService', 'v0.1', function() {
			$log.debug("partnerSchoolService Loaded......");
			deferred.resolve();

		}, apiRoot);*/

		/*
		 * gapi.client.load('uploadUrlService', 'v0.1', function() {
		 * $log.debug("uploadUrlService Loaded......"); deferred.resolve(); },
		 * apiRoot);
		 
		gapi.client.load('scheduledStudentExamService', 'v0.1', function() {
			$log.debug("ScheduledStudentExamService Loaded......");
		}, apiRoot);*/

		gapi.client.load('authorizationService', 'v0.1', function() {
			$log.debug("authorizationService Loaded......");
		}, apiRoot);

		gapi.client.load('protostarAdminService', 'v0.1', function() {
			$log.debug("protostarAdminService Loaded......");			
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('uploadUrlService', 'v0.1', function() {
			$log.debug("uploadUrlService Loaded......");
		}, apiRoot);

		gapi.client.load('uploadPathService', 'v0.1', function() {
			$log.debug("uploadPathService Loaded......");
			endpointFactory.is_service_ready = true;
		}, apiRoot);

		/*gapi.client.load('gfStudentService', 'v0.1', function() {
			$log.debug("gfStudentService Loaded......");
		}, apiRoot);
		gapi.client.load('gfCourierService', 'v0.1', function() {
			$log.debug("gfCourierService Loaded......");
		}, apiRoot);
		gapi.client.load('gfBookStockService', 'v0.1', function() {
			$log.debug("gfBookStockService Loaded......");
		}, apiRoot);*/

		return deferred.promise;

	};

	endpointFactory.getUtilityService = function() {

		return {
			checkConfirmPassword : function(pwd, cpwd) {

				if (pwd != "undefined" && cpwd != "undefined") {
					if (pwd == cpwd) {
						return null;
					} else {
						return "Password Does Not Match.";
					}
				}
			},

			objectArrayContains : function(array, value) {
				var foundIndex = -1;
				for (i = 0; i < array.length; i++) {
					if (value.id === array[i].id) {
						foundIndex = i;
						break;
					}
				}

				return foundIndex > -1;

			}
		}

	}

	return endpointFactory;
}
