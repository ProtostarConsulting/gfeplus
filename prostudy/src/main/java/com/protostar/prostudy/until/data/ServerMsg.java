package com.protostar.prostudy.until.data;

public class ServerMsg {
	private String msg;
	private boolean bool;
	
	public boolean getBool() {
		return bool;
	}
	public void setBool(boolean bool) {
		this.bool = bool;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	private String token;

}
