import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // populated by JwtAuthGuard

    // Placeholder: check if user has admin role.
    // In a real implementation, you would check a role claim in the JWT
    // or fetch the user's role from the database.
    // Here we assume the JWT contains a 'role' property or we have a list of admin emails.
    // For this demonstration, we allow only a specific email (read from env).
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',');
    if (user && user.email && adminEmails.includes(user.email)) {
      return true;
    }
    throw new UnauthorizedException('Admin access required');
  }
}
