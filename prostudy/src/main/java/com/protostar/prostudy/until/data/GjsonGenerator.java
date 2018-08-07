package com.protostar.prostudy.until.data;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.protostar.prostudy.entity.Address;

public class GjsonGenerator {

	private static Gson gson;
	static {
		gson = new GsonBuilder().serializeNulls().create();
	}

	public static String converToJson(Object input) {
		return gson.toJson(input);
	}

	public static void main(String[] args) {
		String jsonStr = GjsonGenerator.converToJson(new Address());
		System.out.println(jsonStr);

	}
}
