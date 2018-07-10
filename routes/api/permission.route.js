// Permission routes. Contains route definitions relative to api/permissions.

const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/permission.controller');


router.get('/', permissionController.getPermissions);
router.get('/:id', permissionController.getPermissionById);
router.post('/', permissionController.createPermission);
router.put('/', permissionController.updatePermission) ;
router.delete('/:id', permissionController.deletePermission);



module.exports = router;