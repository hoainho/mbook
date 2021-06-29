package com.mbook.service;
import java.util.List;
import com.mbook.model.UserModel;


public interface IUserService {
	List<UserModel> findAll();
}
