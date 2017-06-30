package com.protostar.prostudy.until.data;

public class Constants {

	// Endpoint API Access Related
	public static final String WEB_CLIENT_ID = "604859223637-9kufq0skh03at4cloiafksec8pan7evl.apps.googleusercontent.com";
	public static final String ANDROID_CLIENT_ID = "";
	public static final String ANDROID_AUDIENCE = WEB_CLIENT_ID;
	public static final String API_EXPLORER_CLIENT_ID = com.google.api.server.spi.Constant.API_EXPLORER_CLIENT_ID;
	public static final String EMAIL_SCOPE = "https://www.googleapis.com/auth/userinfo.email";
	public static final String PROFILE_SCOPE = "https://www.googleapis.com/auth/userinfo.profile";

	// GCS bucket names
	// public static final String PROERP_IMAGES_BUCKET = "proerp_image_files";
	public static final String PROERP_IMAGES_BUCKET = "prostudygrf12_image_files";
	public static final String DEFAULT_INSTITUTE_NAME = "Protostar Consulting Services";
	public static final String PROTOSTAR_FROM_EMAIL_NAME = "ProStudy Notification";
	public static final String PROTOSTAR_FROM_EMAIL_ID = "info@protostar.co.in";
	
	// Counter/Sequence Names
	public static final String SCHOOL_REGISTRATION_NO_COUNTER = "SCHOOL_REGISTRATION_NO_COUNTER";
	public static final String STUDENT_REGISTRATION_NO_COUNTER = "STUDENT_REGISTRATION_NO_COUNTER";
	public static final String PAYMENT_RECEIPET_NO = "PAYMENT_RECEIPET_NO";
	public static final String INVOICE_NO_COUNTER = "INVOICE_NO_COUNTER";
	public static final String VOUCHER_NO_COUNTER = "VOUCHER_NO_COUNTER";
	

	// Default Authorizations
	public static final String PROTOSTAR_DEFAULT_AUTHS = "{\"authorizations\":[{\"authName\":\"More Actions\",\"authorizations\":[{\"authName\":\"proadmin\",\"authorizations\":[]},{\"authName\":\"setup\",\"authorizations\":[]},{\"authName\":\"updatemyprofile\",\"authorizations\":[]}]}]}";
	public static final String NEW_BIZ_DEFAULT_AUTHS = "{\"authorizations\":[{\"authName\":\"More Actions\",\"authorizations\":[{\"authName\":\"setup\",\"authorizations\":[]},{\"authName\":\"updatemyprofile\",\"authorizations\":[]}]}]}";
	public static final String NEW_BIZ_ADMIN_USER_DEFAULT_AUTHS = "{\"authorizations\":[{\"authName\":\"More Actions\",\"authorizations\":[{\"authName\":\"setup\",\"authorizations\":[]},{\"authName\":\"updatemyprofile\",\"authorizations\":[]}]}]}";
	public static final String NEW_BIZ_USER_DEFAULT_AUTHS = "{\"authorizations\":[{\"authName\":\"More Actions\",\"authorizations\":[{\"authName\":\"updatemyprofile\",\"authorizations\":[]}]}]}";

	
	
	//Misc
	public static final String DEFAULT_EMP_DEPT = "Default";
}
