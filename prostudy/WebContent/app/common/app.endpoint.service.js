angular.module("prostudyApp").factory('appEndpointSF', appEndpointSF);

function appEndpointSF($log, localDBServiceFactory, googleEndpointSF) {
	// When app is in test mode, it will return service from local db store.
	// Else actual google end points.

	// var isTestMode = true;
	var isTestMode = false;

	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services

	endpointFactory.getPartnerSchoolService = function() {

		if (isTestMode)
			return localDBServiceFactory.getPartnerSchoolService();
		else
			return googleEndpointSF.getPartnerSchoolService();
	};
	
	endpointFactory.getLocalUserService = function() {
		return localDBServiceFactory.getUserService();
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

	endpointFactory.getStandardService = function() {

		if (isTestMode)
			return localDBServiceFactory.getStandardService();
		else
			return googleEndpointSF.getStandardService();
	};

	endpointFactory.getDivisionService = function() {

		if (isTestMode)
			return localDBServiceFactory.getDivisionService();
		else
			return googleEndpointSF.getDivisionService();
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

	endpointFactory.getPracticeExamResultService = function() {
		if (isTestMode)
			return localDBServiceFactory.getPracticeExamResultService();
		else
			return googleEndpointSF.getPracticeExamResultService();
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

		gapi.client.load('chapterService', 'v0.1', function() {
			$log.debug("chapterService Loaded....");

		}, apiRoot);

		gapi.client.load('bookService', 'v0.1', function() {
			$log.debug("bookService Loaded....");

		}, apiRoot);

		gapi.client.load('studentService', 'v0.1', function() {
			$log.debug("StudentService Loaded....");

		}, apiRoot);
		
		gapi.client.load('paymentService', 'v0.1', function() {
			$log.debug("paymentService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('questionService', 'v0.1', function() {
			$log.debug("QuestionService Loaded....");

		}, apiRoot);

		gapi.client.load('practiceExamService', 'v0.1', function() {
			$log.debug("PracticeExamService Loaded....");

		}, apiRoot);

		gapi.client.load('syllabusService', 'v0.1', function() {
			$log.debug("syllabusService Loaded......");

		}, apiRoot);

		gapi.client.load('practiceExamResultService', 'v0.1', function() {
			$log.debug("PracticeExamResultService Loaded......");

		}, apiRoot);

		gapi.client.load('instituteService', 'v0.1', function() {
			$log.debug("InstituteService Loaded......");

		}, apiRoot);

		gapi.client.load('attendanceService', 'v0.1', function() {
			$log.debug("AttendanceService Loaded......");

		}, apiRoot);

		gapi.client.load('standardService', 'v0.1', function() {
			$log.debug("StandardService Loaded......");

		}, apiRoot);

		gapi.client.load('divisionService', 'v0.1', function() {
			$log.debug("DivisionService Loaded......");

		}, apiRoot);

		gapi.client.load('subjectService', 'v0.1', function() {
			$log.debug("SubjectService Loaded......");

		}, apiRoot);	
		
		//This loads google chart api
		google.charts.load('43', {packages: ['corechart']});

		gapi.client.load('certificateService', 'v0.1', function() {
			$log.debug("CertificateService Loaded......");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('studSubService', 'v0.1', function() {
			$log.debug("StudSubService Loaded......");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('partnerSchoolService', 'v0.1', function() {
			$log.debug("partnerSchoolService Loaded......");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
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
