package com.mbook.service.impl;

import java.util.List;

import javax.inject.Inject;

import com.mbook.DAO.IUserDAO;
import com.mbook.model.UserModel;
import com.mbook.service.IUserService;

public class UserService implements IUserService {
	
	
	
	@Inject
	private IUserDAO userDao;
	
	@Override
	public List<UserModel> findAll() {
		return userDao.findAll();
	}
	
}		
