package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Subclass;

@Subclass
public class UserAnsEntity {

	private String qID;
	private String userOption;

	public String getqID() {
		return qID;
	}
	public void setqID(String qID) {
		this.qID = qID;
	}
	public String getUserOption() {
		return userOption;
	}
	public void setUserOption(String userOption) {
		this.userOption = userOption;
	}
}


