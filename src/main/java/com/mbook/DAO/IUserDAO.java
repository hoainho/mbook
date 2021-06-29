package com.mbook.DAO;

import java.util.List;

import com.mbook.model.UserModel;

public interface IUserDAO {
	 List<UserModel> findAll();
}
