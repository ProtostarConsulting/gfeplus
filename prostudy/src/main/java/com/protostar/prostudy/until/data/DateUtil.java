package com.protostar.prostudy.until.data;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.service.InstituteService;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class DateUtil {
	public static Date removeTime(Date date) {
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("IST"));
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

	public static Date convertCSTtoISTTime(Date date) {
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("IST"));
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 5);
		cal.set(Calendar.MINUTE, 30);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

	public static Date addDays(Date date, int days) {
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("IST"));
		cal.setTime(date);
		cal.add(Calendar.DATE, days);
		return cal.getTime();
	}

	public static String getCurrentGVSPYear() {
		String yearofExam = null;
		List<InstituteEntity> institueList = ofy().load()
				.type(InstituteEntity.class).list();
		for (InstituteEntity instituteEntity : institueList) {
			yearofExam = instituteEntity.getYearofExam();
		}
		return yearofExam;
	}
}
