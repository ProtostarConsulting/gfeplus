package com.protostar.prostudy.until.data;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.BaseEntity;
import com.protostar.prostudy.entity.InstituteEntity;

public class EntityUtil {

	public static List<?> updateCreatedModifiedDate(
			@SuppressWarnings("rawtypes") List entityList) {
		if (entityList != null && entityList.size() > 0) {
			Date dateNow = new Date();
			for (Object obj : entityList) {
				BaseEntity entityObj = (BaseEntity) obj;
				if (entityObj.getId() == null) {
					entityObj.setCreatedDate(dateNow);
				} else {
					entityObj.setModifiedDate(dateNow);
				}
			}
		}
		return entityList;
	}

	public static BaseEntity updateCreatedModifiedDate(BaseEntity entityObj) {
		Date dateNow = new Date();
		if (entityObj.getId() == null) {
			entityObj.setCreatedDate(dateNow);
		} else {
			entityObj.setModifiedDate(dateNow);
		}
		return entityObj;
	}

	public static com.google.appengine.api.datastore.Key getInstituteEntityRawKey(InstituteEntity entityObj) {
		return Key.create(InstituteEntity.class, entityObj.getId()).getRaw();
	}
	public static com.google.appengine.api.datastore.Key getInstituteEntityRawKey(Long instituteId) {
		return Key.create(InstituteEntity.class, instituteId).getRaw();
	}
}
