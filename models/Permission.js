import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema(
    {
        user: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            }

        },
        permissions: {
            viewUsers: {
                type: Boolean,
                required: true,
            },
            viewProducts: {
                type: Boolean,
                required: true,
            },
            viewPermissions: {
                type: Boolean,
                required: true,
            }
        }
    },
    {
        timestamps: true,
    }
);

const Permission = mongoose.model('Permission', PermissionSchema);
export default Permission;