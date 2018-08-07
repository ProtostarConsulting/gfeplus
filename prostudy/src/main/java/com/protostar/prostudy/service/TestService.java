package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.prostudy.dao.TestDAO;
import com.protostar.prostudy.entity.Car;
import com.protostar.prostudy.entity.CarOwner;
import com.protostar.prostudy.until.data.ServerMsg;



//@Api(name = "testservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class TestService
{
	
	@ApiMethod(name="addTest")
	public ServerMsg addTest(ServerMsg value)
	{		
		value.setMsg(value.getMsg() + "...Server Added this");
		return value;
	}
	
	@ApiMethod(name="getTests")
	public List<ServerMsg> getTests(){		
		return new ArrayList<ServerMsg>();		
	}
	
	@ApiMethod(name = "addCar")
	public void addCar(Car c) {
		System.out.println("In side test1 ");
		new TestDAO().addCar(c);

	}

	@ApiMethod(name = "getCars")
	public List<Car> getCars() {
		System.out.println("In side getCars ");
		return new TestDAO().getCars();

	}

	@ApiMethod(name = "getCarOwners")
	public List<CarOwner> getCarOwners() {
		System.out.println("In side getCarOwners ");		
		return ofy().load().type(CarOwner.class).list();

	}
}
