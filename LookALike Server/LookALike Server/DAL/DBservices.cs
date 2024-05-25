using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using LookALike_Server.Class;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using System.Xml.Linq;
//using RuppinProj.Models;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }


    //--------------------------------------------------------------------------------------------------
    // This method Inserts a User to the Users table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(User user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateUserInsertCommandWithStoredProcedure("sp_LAL_InsertUser", con, user);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert User using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateUserInsertCommandWithStoredProcedure(String spName, SqlConnection con, User user)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", user.Email);
        cmd.Parameters.AddWithValue("@First_name", user.FirstName);
        cmd.Parameters.AddWithValue("@Last_name", user.LastName);
        cmd.Parameters.AddWithValue("@Image", user.Image);
        cmd.Parameters.AddWithValue("@Phone_Number", user.PhoneNumber);
        cmd.Parameters.AddWithValue("@Date_of_Birth", user.DateOfBirth);
        cmd.Parameters.AddWithValue("@Password", user.Password);

        return cmd;
    }


    //--------------------------------------------------------------------------------------------------
    // This method reads Users from the database 
    //--------------------------------------------------------------------------------------------------
    public List<User> ReadUsers()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<User> UsersList = new List<User>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateUserCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadUsers", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                User u = new User();
                u.Email = dataReader["Email"].ToString();
                u.FirstName = dataReader["First_Name"].ToString();
                u.LastName = dataReader["Last_Name"].ToString();
                u.Image = dataReader["Image"].ToString();
                u.PhoneNumber = Convert.ToInt32(dataReader["Phone_Number"]);
                // Retrieve Date_of_birth as DateTime
                DateTime dateOfBirth = (DateTime)dataReader["Date_of_Birth"];
                // Convert DateTime to DateOnly
                //DateOnly dateOnlyOfBirth = new DateOnly(dateOfBirth.Year, dateOfBirth.Month, dateOfBirth.Day);
                u.DateOfBirth = dateOfBirth;

                //u.DateOfBirth = (DateOnly)dataReader["Date_of_birth"];

                u.Password = dataReader["Password"].ToString();
                UsersList.Add(u);
            }
            return UsersList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateUserCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Update User from the database 
    //--------------------------------------------------------------------------------------------------
    public int UpdateUser(User user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateUserCommandWithStoredProcedureWithoutParameters("sp_LAL_UpdateUser", con, user);   // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for UpdateUser using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand UpdateUserCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con, User user)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", user.Email);
        cmd.Parameters.AddWithValue("@First_name", user.FirstName);
        cmd.Parameters.AddWithValue("@Last_name", user.LastName);
        cmd.Parameters.AddWithValue("@Image", user.Image);
        cmd.Parameters.AddWithValue("@Phone_Number", user.PhoneNumber);
        cmd.Parameters.AddWithValue("@Date_of_Birth", user.DateOfBirth);
        cmd.Parameters.AddWithValue("@Password", user.Password);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Item to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(Item item)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateItemInsertCommandWithStoredProcedure("sp_LAL_InsertItem", con, item);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert Item using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateItemInsertCommandWithStoredProcedure(String spName, SqlConnection con, Item item)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Item_Code", item.Item_Code);
        cmd.Parameters.AddWithValue("@Name", item.Name);
        cmd.Parameters.AddWithValue("@Image", item.Image);
        cmd.Parameters.AddWithValue("@Color_Code", item.Color_Code);
        cmd.Parameters.AddWithValue("@Season", item.Season);
        cmd.Parameters.AddWithValue("@Size", item.Size);
        cmd.Parameters.AddWithValue("@Brand_ID", item.Brand_ID);
        cmd.Parameters.AddWithValue("@Price", item.Price);
        cmd.Parameters.AddWithValue("@Is_Favorite", item.Is_Favorite);
        cmd.Parameters.AddWithValue("@Status", item.Status);
        cmd.Parameters.AddWithValue("@Email", item.User_Email);
        cmd.Parameters.AddWithValue("@Clothing_Type_ID", item.ClothingType_ID);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Item> ReadItems()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Item> ItemsList = new List<Item>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateItemsCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadItems", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Item i = new Item();
                string item_code_flag = dataReader["Item_Code"].ToString();
                i.Item_ID= Convert.ToInt32(dataReader["Item_ID"]);
                if(item_code_flag == "")
                {
                    i.Item_Code = 999;
                }
                else
                {
                    i.Item_Code = Convert.ToInt32(dataReader["Item_Code"]);
                }
                i.Name = dataReader["Name"].ToString();
                i.Image = dataReader["Image"].ToString();
                i.Color_Code = dataReader["Color_Code"].ToString();
                i.Season = dataReader["Season"].ToString();
                i.Size = dataReader["Size"].ToString();
                i.Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]);
                i.Price = Convert.ToDouble(dataReader["Price"]);
                i.Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite"));
                i.Status = dataReader["Status"].ToString();
                i.User_Email = dataReader["Email"].ToString();
                i.ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]);

                ItemsList.Add(i);
            }
            return ItemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the Read using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateItemsCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }


    //--------------------------------------------------------------------------------------------------
    // This method Update item from the database 
    //--------------------------------------------------------------------------------------------------
    public int UpdateItem(Item item)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateItemCommandWithStoredProcedureWithoutParameters("sp_LAL_EditItem", con, item);   // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for UpdateUser using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand UpdateItemCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con, Item item)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Item_Code", item.Item_Code);
        cmd.Parameters.AddWithValue("@Name", item.Name);
        cmd.Parameters.AddWithValue("@Image", item.Image);
        cmd.Parameters.AddWithValue("@Color_Code", item.Color_Code);
        cmd.Parameters.AddWithValue("@Item_ID", item.Item_ID);
        cmd.Parameters.AddWithValue("@Size", item.Size);
        cmd.Parameters.AddWithValue("@Brand_ID", item.Brand_ID);
        cmd.Parameters.AddWithValue("@Price", item.Price);
        cmd.Parameters.AddWithValue("@Season", item.Season);
        cmd.Parameters.AddWithValue("@Is_Favorite", item.Is_Favorite);
        cmd.Parameters.AddWithValue("@Status", item.Status);
        cmd.Parameters.AddWithValue("@Email", item.User_Email);
        cmd.Parameters.AddWithValue("@Clothing_Type_ID", item.ClothingType_ID);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method read all top items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Item> GetAllTop(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Item> itemsList = new List<Item>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }

        cmd = CreateGetAllTopCommandWithStoredProcedureWithParameters("sp_LAL_GetTopItemsByUser", con, email); // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Item i = new Item();
                string item_code_flag = dataReader["Item_Code"].ToString();
                i.Item_ID = Convert.ToInt32(dataReader["Item_ID"]);
                if (item_code_flag == "")
                {
                    i.Item_Code = 999;
                }
                else
                {
                    i.Item_Code = Convert.ToInt32(dataReader["Item_Code"]);
                }
                i.Name = dataReader["Name"].ToString();
                i.Image = dataReader["Image"].ToString();
                i.Color_Code = dataReader["Color_Code"].ToString();
                i.Season = dataReader["Season"].ToString();
                i.Size = dataReader["Size"].ToString();
                i.Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]);
                i.Price = Convert.ToDouble(dataReader["Price"]);
                i.Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite"));
                i.Status = dataReader["Status"].ToString();
                i.User_Email = dataReader["Email"].ToString();
                i.ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]);

                itemsList.Add(i);
            }
            return itemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the command with stored procedure and parameters
    //---------------------------------------------------------------------------------
    private SqlCommand CreateGetAllTopCommandWithStoredProcedureWithParameters(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add parameters
        cmd.Parameters.AddWithValue("@Email", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method read all bottom items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Item> GetAllBottom(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Item> itemsList = new List<Item>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }

        cmd = CreateGetAllBottomCommandWithStoredProcedureWithParameters("sp_LAL_GetBottomItemsByUser", con, email); // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Item i = new Item();
                //string item_code_flag = dataReader["Item_Code"].ToString();
                i.Item_ID = Convert.ToInt32(dataReader["Item_ID"]);
                i.Item_Code = Convert.ToInt32(dataReader["Item_Code"]);
                i.Name = dataReader["Name"].ToString();
                i.Image = dataReader["Image"].ToString();
                i.Color_Code = dataReader["Color_Code"].ToString();
                i.Season = dataReader["Season"].ToString();
                i.Size = dataReader["Size"].ToString();
                i.Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]);
                i.Price = Convert.ToDouble(dataReader["Price"]);
                i.Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite"));
                i.Status = dataReader["Status"].ToString();
                i.User_Email = dataReader["Email"].ToString();
                i.ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]);

                itemsList.Add(i);
            }
            return itemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the command with stored procedure and parameters
    //---------------------------------------------------------------------------------
    private SqlCommand CreateGetAllBottomCommandWithStoredProcedureWithParameters(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add parameters
        cmd.Parameters.AddWithValue("@Email", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Brands from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Brand> ReadAllBrands()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Brand> BrandList = new List<Brand>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateBrandCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadBrands", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Brand b = new Brand();
                b.Id = Convert.ToInt32(dataReader["ID"]);
                b.BrandName = dataReader["Brand_Name"].ToString();
                BrandList.Add(b);
            }
            return BrandList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateBrandCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Brands from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ClothingType> ReadAllClothingTypes()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ClothingType> ClothingType_List = new List<ClothingType>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadClothingTypesCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllClothingTypes", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ClothingType ct = new ClothingType();
                ct.Id = Convert.ToInt32(dataReader["ID"]);
                ct.Clothing_Type = dataReader["Clothing_Type"].ToString();
                ct.Clothing_Part = dataReader["Clothing_Part"].ToString();
                ClothingType_List.Add(ct);
            }
            return ClothingType_List;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadClothingTypesCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Brands from the database 
    //--------------------------------------------------------------------------------------------------
    public List<UserFollowers> ReadAllFollowers()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<UserFollowers> UserFollowers_List = new List<UserFollowers>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllUserFollowersTypesCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllFollowers", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                UserFollowers uf = new UserFollowers();
                uf.Follower_Email = dataReader["Follower_Email"].ToString();
                uf.Following_Email = dataReader["Following_Email"].ToString();
                UserFollowers_List.Add(uf);
            }
            return UserFollowers_List;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllUserFollowersTypesCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Follower to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int InsertNewFollower(UserFollowers uf)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateNewFollowInsertCommandWithStoredProcedure("sp_LAL_InsertNewFollower", con, uf);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert Item using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateNewFollowInsertCommandWithStoredProcedure(String spName, SqlConnection con, UserFollowers userFollowers)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Follower_Email", userFollowers.Follower_Email);
        cmd.Parameters.AddWithValue("@Following_Email", userFollowers.Following_Email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads ClothingAds from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ClothingAd> ReadClothingAds()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ClothingAd> ClothingAdsList = new List<ClothingAd>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateClothingAdsCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllAds", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ClothingAd ca = new ClothingAd();
                ca.Ad_ID = Convert.ToInt32(dataReader["Ad_ID"]);
                ca.User_Email = dataReader["User_Email"].ToString();
                ca.Item_ID = Convert.ToInt32(dataReader["Item_ID"]);
                ca.Price = Convert.ToDouble(dataReader["Price"]);
                ca.Address = dataReader["Address"].ToString();
                ca.Ad_Status1 = dataReader["Ad_Status"].ToString();
                ca.Condition1 = dataReader["Condition"].ToString();
                ca.Item_Image = dataReader["Image"].ToString();
                ca.Phone_Number = dataReader["Phone_Number"].ToString();
                ca.ItemName = dataReader["name"].ToString();
                ca.ClothingType_Name = dataReader["Clothing_Type"].ToString();
                ClothingAdsList.Add(ca);

            }
            return ClothingAdsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateClothingAdsCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a ClothingAd to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(ClothingAd clothingAd)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateAdInsertCommandWithStoredProcedure("sp_LAL_InsertNewAd", con, clothingAd);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert ClothingAd using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateAdInsertCommandWithStoredProcedure(String spName, SqlConnection con, ClothingAd clothingAd)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Item_ID", clothingAd.Item_ID);
        cmd.Parameters.AddWithValue("@Price", clothingAd.Price);
        cmd.Parameters.AddWithValue("@Ad_Status", clothingAd.Ad_Status1);
        cmd.Parameters.AddWithValue("@Address", clothingAd.Address);
        cmd.Parameters.AddWithValue("@User_Email", clothingAd.User_Email);
        cmd.Parameters.AddWithValue("@Condition", clothingAd.Condition1);


        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a ManualLook to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(ManualLook manualLook)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreatemanualLookInsertCommandWithStoredProcedure("sp_LAL_InsertNewManualLook", con, manualLook);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert ManualLook using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreatemanualLookInsertCommandWithStoredProcedure(String spName, SqlConnection con, ManualLook manualLook)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //cmd.Parameters.AddWithValue("@Look_ID", manualLook.LookId);
        cmd.Parameters.AddWithValue("@TopSelection_ItemId", manualLook.TopSelection_ItemId);
        cmd.Parameters.AddWithValue("@ButtomSelection_ItemId", manualLook.ButtomSelection_ItemId);
        cmd.Parameters.AddWithValue("@TopSelection_Image", manualLook.TopSelection_Image);
        cmd.Parameters.AddWithValue("@ButtomSelection_Image", manualLook.ButtomSelection_Image);
        cmd.Parameters.AddWithValue("@CreatedDateDateTime", manualLook.CreatedDate);
        cmd.Parameters.AddWithValue("@CalendarDateDateTime", manualLook.CalendarDate);
        cmd.Parameters.AddWithValue("@UserEmail", manualLook.UserEmail);


        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Manual Looks from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ManualLook> ReadAllManualLook()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ManualLook> ManualLooksList = new List<ManualLook>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateManualLookCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllManualLook", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ManualLook ml = new ManualLook();
                ml.LookId = Convert.ToInt32(dataReader["Look_ID"]);
                ml.TopSelection_ItemId = Convert.ToInt32(dataReader["TopSelection_ItemId"]);
                ml.ButtomSelection_ItemId = Convert.ToInt32(dataReader["ButtomSelection_ButtomSelection_ItemIdItemI"]);
                ml.TopSelection_Image = dataReader["TopSelection_Image"].ToString();
                ml.ButtomSelection_Image = dataReader["ButtomSelection_Image"].ToString();
                // Retrieve Date_of_birth as DateTime
                DateTime CreatedDate = (DateTime)dataReader["CreatedDateDateTime"];
                ml.CreatedDate = CreatedDate;
                DateTime CalendarDate = (DateTime)dataReader["CalendarDateDateTime"];
                ml.CalendarDate = CalendarDate;
                ml.UserEmail = dataReader["UserEmail"].ToString();
                ManualLooksList.Add(ml);

            }
            return ManualLooksList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateManualLookCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

}