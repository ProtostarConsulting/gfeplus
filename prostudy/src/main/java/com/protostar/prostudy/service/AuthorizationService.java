package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.EmbeddedEntity;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Transaction;
import com.protostar.prostudy.entity.Authorization;
import com.protostar.prostudy.entity.AuthorizationMasterEntity;

@Api(name = "authorizationService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""), scopes = {
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile" })
public class AuthorizationService {

	private static final String AUTHORIZATION_MASTER_ENTITY_PROPERTY_KEY = "authorizations";
	private static final String AUTHORIZATION_MASTER_ENTITY_KIND = "AuthorizationMasterEntity";
	private static final String AUTHORIZATION_MASTER_ENTITY_KIND_KEY_NAME = "1";

	/* This method does add or save of an entity */
	@ApiMethod(name = "saveAuthorizationMasterEntity")
	public void saveAuthorizationMasterEntity(
			AuthorizationMasterEntity authMaster) {

		DatastoreService datastore = DatastoreServiceFactory
				.getDatastoreService();

		Entity authorizationMasterEntity = new Entity(
				AUTHORIZATION_MASTER_ENTITY_KIND,
				AUTHORIZATION_MASTER_ENTITY_KIND_KEY_NAME);
		List<EmbeddedEntity> authorizationEntities = new ArrayList<EmbeddedEntity>();
		List<Authorization> authorizations = authMaster.getAuthorizations();

		if(authorizations == null || authorizations.isEmpty()){
			throw new RuntimeException("The authorizations list is empty. Not Allowed!");
		}
		// Convert the Auth POJO Hierarchy to EmbeddedEntity entity hierarchy
		for (Authorization authorization : authorizations) {
			authorizationEntities.add(getAuthEntity(authorization));
		}

		authorizationMasterEntity
				.setProperty(AUTHORIZATION_MASTER_ENTITY_PROPERTY_KEY,
						authorizationEntities);

		Transaction txn = datastore.beginTransaction();
		datastore.put(authorizationMasterEntity);
		txn.commit();

	}

	@ApiMethod(name = "getAuthorizationMasterEntity", path = "getAuthorizationMasterEntity")
	/*public AuthorizationMasterEntity getAuthorizationMasterEntity(User user)
			throws EntityNotFoundException {
*/
	public AuthorizationMasterEntity getAuthorizationMasterEntity(){

		/*
		 * com.google.appengine.api.users.UserService userService =
		 * UserServiceFactory .getUserService();
		 */
		/*if (user != null) {
			// user = userService.getCurrentUser();
			System.out.println("User is: " + user.getEmail());
		} else
			System.out.println("User is is NULL");*/

		AuthorizationMasterEntity authMaster = new AuthorizationMasterEntity();
		List<Authorization> authorizations = new ArrayList<Authorization>();
		authMaster.setAuthorizations(authorizations);

		DatastoreService datastore = DatastoreServiceFactory
				.getDatastoreService();

		Key authMasterKey = new Entity(AUTHORIZATION_MASTER_ENTITY_KIND,
				AUTHORIZATION_MASTER_ENTITY_KIND_KEY_NAME).getKey();

		Entity authMasterEntity = null;
		
		try {
			authMasterEntity = datastore.get(authMasterKey);
		} catch (EntityNotFoundException e) {
			e.printStackTrace();
		}
		
		if(authMasterEntity == null){
			//No entity found, return empty AuthorizationMasterEntity			
			return new AuthorizationMasterEntity();			
		}
		
		@SuppressWarnings("unchecked")
		List<EmbeddedEntity> authorizationEntities = (List<EmbeddedEntity>) authMasterEntity
				.getProperty(AUTHORIZATION_MASTER_ENTITY_PROPERTY_KEY);
		// Convert the Auth Hierarchy to POJO
		for (EmbeddedEntity authorizationEntity : authorizationEntities) {
			authorizations.add(getAuthorization(authorizationEntity));
		}

		return authMaster;
	}

	private EmbeddedEntity getAuthEntity(Authorization authObject) {
		List<EmbeddedEntity> subAuthorizationEntities = new ArrayList<EmbeddedEntity>();
		EmbeddedEntity authorizationEntity = new EmbeddedEntity();

		authorizationEntity.setProperty(Authorization.AUTH_NAME,
				authObject.getAuthName());
		authorizationEntity.setProperty(Authorization.AUTH_DISPLAY_NAME,
				authObject.getAuthDisplayName());
		authorizationEntity.setProperty(Authorization.ORDER_NUMBER,
				authObject.getOrderNumber());
		authorizationEntity.setProperty(Authorization.UI_STATE_NAME,
				authObject.getUiStateName());
		List<Authorization> subAuthorizations = authObject.getAuthorizations();
		if (subAuthorizations != null && !subAuthorizations.isEmpty()) {
			for (Authorization authorization : subAuthorizations) {
				subAuthorizationEntities.add(getAuthEntity(authorization));
			}
			authorizationEntity.setProperty(
					AUTHORIZATION_MASTER_ENTITY_PROPERTY_KEY,
					subAuthorizationEntities);
		}
		return authorizationEntity;
	}

	@SuppressWarnings("unchecked")
	private Authorization getAuthorization(EmbeddedEntity authorizationEntity) {

		List<Authorization> subAuthorizations = new ArrayList<Authorization>();
		Authorization authorization = new Authorization();

		authorization.setAuthName((String) authorizationEntity
				.getProperty(Authorization.AUTH_NAME));
		authorization.setAuthDisplayName((String) authorizationEntity
				.getProperty(Authorization.AUTH_DISPLAY_NAME));
		authorization.setOrderNumber((Long) authorizationEntity
				.getProperty(Authorization.ORDER_NUMBER));
		authorization.setUiStateName((String) authorizationEntity
				.getProperty(Authorization.UI_STATE_NAME));

		Object propertyVal = authorizationEntity
				.getProperty(AUTHORIZATION_MASTER_ENTITY_PROPERTY_KEY);

		List<EmbeddedEntity> subAuthorizationEntities = null;
		if (propertyVal != null && propertyVal instanceof List<?>) {
			subAuthorizationEntities = (List<EmbeddedEntity>) propertyVal;
		}

		if (subAuthorizationEntities != null
				&& !subAuthorizationEntities.isEmpty()) {
			for (EmbeddedEntity authorizationEntityTemp : subAuthorizationEntities) {
				subAuthorizations
						.add(getAuthorization(authorizationEntityTemp));
				// Using recursion here to convert complete tree hierarchy
			}

			authorization.setAuthorizations(subAuthorizations);
		}

		return authorization;
	}

}