package com.protostar.prostudy.until.data;

import java.util.List;

public class EntityPagingInfo {
	
	@SuppressWarnings("rawtypes")
	private List entityList;
	private long startPage = 1;
	private int limit = 60;
	private long totalEntities;
	private String webSafeCursorString;
	
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public long getTotalEntities() {
		return totalEntities;
	}
	public void setTotalEntities(long totalEntities) {
		this.totalEntities = totalEntities;
	}
	@SuppressWarnings("rawtypes")
	public List getEntityList() {
		return entityList;
	}
	
	public void setEntityList(@SuppressWarnings("rawtypes") List entityList) {
		this.entityList = entityList;
	}
	public String getWebSafeCursorString() {
		return webSafeCursorString;
	}
	public void setWebSafeCursorString(String webSafeCursorString) {
		this.webSafeCursorString = webSafeCursorString;
	}
	public long getStartPage() {
		return startPage;
	}
	public void setStartPage(long startPage) {
		this.startPage = startPage;
	}	

}
