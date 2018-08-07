package com.protostar.prostudy.until;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {

	private static Pattern pattern;
	private static Matcher matcher;

	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	static {
		pattern = Pattern.compile(EMAIL_PATTERN);
	}

	/**
	 * Validate hex with regular expression
	 *
	 * @param emailId
	 *            hex for validation
	 * @return true valid emailId, false invalid emailId
	 */
	public static boolean validate(final String emailId) {
		if(emailId == null)
			return false;
		matcher = pattern.matcher(emailId);
		return matcher.matches();

	}
}