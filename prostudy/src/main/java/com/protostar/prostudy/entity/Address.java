package com.protostar.prostudy.entity;

public class Address {

	private String addressType = "Default";
	private String line1 = "";
	private String line2 = "";
	private String city = "";
	private String tal = "";
	private String state = "";
	private String country = "";
	private String dist = "";
	private String pin = "";
	private boolean otherAddressFlag;

	public Address() {
	}

	public Address(String line1) {
		this.line1 = line1;
	}

	public boolean isOtherAddressFlag() {
		return otherAddressFlag;
	}

	public void setOtherAddressFlag(boolean otherAddressFlag) {
		this.otherAddressFlag = otherAddressFlag;
	}

	public String getLine1() {
		return line1;
	}

	public void setLine1(String line1) {
		this.line1 = line1;
	}

	public String getLine2() {
		return line2;
	}

	public void setLine2(String line2) {
		this.line2 = line2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getAddressType() {
		return addressType;
	}

	public void setAddressType(String addressType) {
		this.addressType = addressType;
	}

	public String getDist() {
		return dist;
	}

	public void setDist(String dist) {
		this.dist = dist;
	}

	public String getTal() {
		return tal;
	}

	public void setTal(String tal) {
		this.tal = tal;
	}

}
