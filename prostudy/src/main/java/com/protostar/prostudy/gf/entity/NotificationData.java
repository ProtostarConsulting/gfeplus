package com.protostar.prostudy.gf.entity;

public class NotificationData {
	int registrationSmsSent = 0;
	int currierSmsSent = 0;
	int registrationEmailSent = 0;
	int currierEmailSent = 0;

	public NotificationData() {

	}

	public int getRegistrationSmsSent() {
		return registrationSmsSent;
	}

	public void setRegistrationSmsSent(int registrationSmsSent) {
		this.registrationSmsSent = registrationSmsSent;
	}

	public int getCurrierSmsSent() {
		return currierSmsSent;
	}

	public void setCurrierSmsSent(int currierSmsSent) {
		this.currierSmsSent = currierSmsSent;
	}

	public int getRegistrationEmailSent() {
		return registrationEmailSent;
	}

	public void setRegistrationEmailSent(int registrationEmailSent) {
		this.registrationEmailSent = registrationEmailSent;
	}

	public int getCurrierEmailSent() {
		return currierEmailSent;
	}

	public void setCurrierEmailSent(int currierEmailSent) {
		this.currierEmailSent = currierEmailSent;
	}
}
