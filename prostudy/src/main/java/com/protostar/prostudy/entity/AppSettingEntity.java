package com.protostar.prostudy.entity;


public class AppSettingEntity {

	private Long instituteID;
	private String angularMaterialTheme;
	private String instituteLogoBlobKey;
	private Integer defaultDisplayTableRowsPerPage = 10;
	private Boolean smeNotificationFlag = false;
	private Boolean emailNotificationFlag = false;
	
	public Long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}

	public Integer getDefaultDisplayTableRowsPerPage() {
		return defaultDisplayTableRowsPerPage;
	}

	public void setDefaultDisplayTableRowsPerPage(
			Integer defaultDisplayTableRowsPerPage) {
		this.defaultDisplayTableRowsPerPage = defaultDisplayTableRowsPerPage;
	}

	public Boolean getSmeNotificationFlag() {
		return smeNotificationFlag;
	}

	public void setSmeNotificationFlag(Boolean smeNotificationFlag) {
		this.smeNotificationFlag = smeNotificationFlag;
	}

	public Boolean getEmailNotificationFlag() {
		return emailNotificationFlag;
	}

	public void setEmailNotificationFlag(Boolean emailNotificationFlag) {
		this.emailNotificationFlag = emailNotificationFlag;
	}

	public String getAngularMaterialTheme() {
		return angularMaterialTheme;
	}

	public void setAngularMaterialTheme(String angularMaterialTheme) {
		this.angularMaterialTheme = angularMaterialTheme;
	}

	public String getInstituteLogoBlobKey() {
		return instituteLogoBlobKey;
	}

	public void setInstituteLogoBlobKey(String instituteLogoBlobKey) {
		this.instituteLogoBlobKey = instituteLogoBlobKey;
	}

}
